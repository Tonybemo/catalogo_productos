const defaultProductos = [
    {
        id: "ejemplo-1",
        categoria: "INSECTICIDAS",
        nombre: "PRODUCTO DE EJEMPLO",
        materiaActiva: "Materia de Ejemplo",
        registro: "00-00-00000",
        lote: "L-0000",
        plazoSeguridad: "No aplica"
    }
];
  
  // Supabase initialization
  const supabaseUrl = 'https://cuhbqppdndzvxvlhlszn.supabase.co';
  const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1aGJxcHBkbmR6dnh2bGhsc3puIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MzE4MTIsImV4cCI6MjA4NzUwNzgxMn0.OjYCEu7btiWjA9gvm3lB5bpfMJYBWx3J5LJsO22RrJk';
  const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

  let productos = [];
  
  // Elementos DOM
  const container = document.getElementById('productosContainer');
  const searchInput = document.getElementById('searchInput');
  const noResults = document.getElementById('noResults');
  const homeMenu = document.getElementById('homeMenu');
  const productosView = document.getElementById('productosView');
  const categoryHeader = document.getElementById('categoryHeader');
  const backBtn = document.getElementById('backBtn');
  const modal = document.getElementById('productModal');
  const modalBody = document.getElementById('modalBody');
  const closeModal = document.getElementById('closeModal');
  const formModal = document.getElementById('formModal');
  const closeFormModal = document.getElementById('closeFormModal');
  const addBtn = document.getElementById('addBtn');
  const editBtn = document.getElementById('editBtn');
  const productForm = document.getElementById('productForm');
  const formCategoria = document.getElementById('formCategoria');
  const fieldsInsecticida = document.getElementById('fieldsInsecticida');
  const fieldsRodenticida = document.getElementById('fieldsRodenticida');
  const btnDelete = document.getElementById('btnDelete');
  const formTitle = document.getElementById('formTitle');
  const detailDeleteBtn = document.getElementById('detailDeleteBtn');
  const formPlazoSeguridad = document.getElementById('formPlazoSeguridad');
  const formMetodoAplicacion = document.getElementById('formMetodoAplicacion');
  const formFechaCaducidad = document.getElementById('formFechaCaducidad');
  const formFichaSeguridad = document.getElementById('formFichaSeguridad');
  const sdsFileName = document.getElementById('sdsFileName');
  
  let currentProductId = null;
  let currentCategory = null;

  // Actualizar nombre de archivo SDS al seleccionar
  formFichaSeguridad.addEventListener('change', (e) => {
      const name = e.target.files[0] ? e.target.files[0].name : 'Adjuntar Ficha (PDF/Imagen)';
      sdsFileName.innerText = name;
  });
  
  if (backBtn) {
      backBtn.addEventListener('click', () => {
          renderMenu();
      });
  }

  function refreshCurrentView() {
      // Evita renderizar vistas nulas si no se ha inicializado
      if (homeMenu && !homeMenu.innerHTML) renderMenu();
      
      if (searchInput.value.trim() !== '') {
          searchInput.dispatchEvent(new Event('input'));
      } else if (currentCategory) {
          openCategory(currentCategory);
      } else {
          renderMenu();
      }
  }
  
  // Initial Render
  document.addEventListener('DOMContentLoaded', async () => {
      await fetchProducts();
      
      // Register Service Worker and Detect updates without loop
      if ('serviceWorker' in navigator) {
          let refreshing = false;
          
          // Detect controller change (when a new SW takes over)
          navigator.serviceWorker.addEventListener('controllerchange', () => {
              if (refreshing) return;
              refreshing = true;
              console.log('Nuevo controlador detectado. Recargando para aplicar cambios...');
              window.location.reload();
          });

          navigator.serviceWorker.register('sw.js').then(reg => {
              reg.addEventListener('updatefound', () => {
                  const newWorker = reg.installing;
                  if (!newWorker) return;
                  newWorker.addEventListener('statechange', () => {
                      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                          console.log('Nueva versión instalada. Esperando activación...');
                      }
                  });
              });
          });
      }
      
      // Request Notification Permission
      requestNotificationPermission();
  });
  
  async function requestNotificationPermission() {
      if ("Notification" in window && Notification.permission !== "granted") {
          await Notification.requestPermission();
      }
  }

  async function checkExpiries() {
      const hoy = new Date();
      const caducados = productos.filter(p => p.fecha_caducidad && new Date(p.fecha_caducidad) < hoy);
      const proximos = productos.filter(p => {
          if (!p.fecha_caducidad) return false;
          const f = new Date(p.fecha_caducidad);
          const diff = (f - hoy) / (1000 * 60 * 60 * 24);
          return diff >= 0 && diff <= 30;
      });

      if ((caducados.length > 0 || proximos.length > 0) && Notification.permission === "granted") {
          try {
              if ('serviceWorker' in navigator) {
                  const reg = await navigator.serviceWorker.ready;
                  reg.showNotification("Aviso de Almacén", {
                      body: `Hay ${caducados.length} productos caducados y ${proximos.length} próximos a caducar.`,
                      icon: "icon.png",
                      badge: "icon.png"
                  });
              } else {
                  new Notification("Aviso de Almacén", {
                      body: `Hay ${caducados.length} productos caducados y ${proximos.length} próximos a caducar.`,
                      icon: "icon.png"
                  });
              }
          } catch (e) {
              console.warn("No se pudo mostrar la notificación:", e);
          }
      }
  }
  
  async function fetchProducts() {
      // Mostrar estado de carga
      container.innerHTML = '<div style="text-align: center; padding: 40px; color: var(--text-secondary);"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 10px;"></i><p>Conectando con la base de datos...</p></div>';

      try {
          const { data, error } = await supabaseClient.from('productos').select('*');
          if (error) throw error;
          
          if (!data || data.length === 0) {
              productos = defaultProductos;
          } else {
              productos = data;
          }
          
          refreshCurrentView();
          
          // Ejecutar avisos de caducidad de forma aislada para no romper la app
          checkExpiries().catch(e => console.warn("Error en checkExpiries:", e));
          
      } catch (err) {
          console.error("Error connecting to Supabase:", err);
          container.innerHTML = `<div style="text-align: center; padding: 40px; color: var(--danger);">
              <i class="fas fa-exclamation-circle" style="font-size: 2.5rem; margin-bottom: 15px;"></i>
              <p>Error de conexión con la base de datos.</p>
              <p style="font-size: 0.8rem; margin-top: 10px; color: var(--text-secondary);">Detalle: ${err.message || err.code || 'Error desconocido'}</p>
              <button onclick="location.reload()" style="background: var(--accent-color); color: white; border: none; padding: 10px 20px; border-radius: 8px; margin-top: 15px; cursor: pointer;">Reintentar</button>
          </div>`;
          
          setTimeout(() => {
              if (productos.length === 0) {
                  productos = defaultProductos;
                  refreshCurrentView();
              }
          }, 3000);
      }
  }

  function saveProducts() {
      // localStorage.setItem('productos', JSON.stringify(productos));
  }
  
  // Menu Render
  function renderMenu() {
      currentCategory = null;
      homeMenu.classList.remove('hidden');
      productosView.classList.add('hidden');
      searchInput.value = '';
      
      const insecticidas = productos.filter(p => p.categoria === 'INSECTICIDAS');
      const rodenticidas = productos.filter(p => p.categoria === 'RODENTICIDAS');
      const biocidas = productos.filter(p => p.categoria === 'DESINFECTANTES' || p.categoria === 'OTROS');
      
      const hoy = new Date();
      const caducadosOProximos = productos.filter(p => {
          if (!p.fecha_caducidad) return false;
          const f = new Date(p.fecha_caducidad);
          const diff = (f - hoy) / (1000 * 60 * 60 * 24);
          return diff <= 30; // Caducados o próximos a 30 días
      });

      homeMenu.innerHTML = `
          <div class="menu-card" onclick="openCategory('INSECTICIDAS')">
              <div class="menu-icon" style="color: var(--insecticida-color); background: rgba(16, 185, 129, 0.1);"><i class="fas fa-bug"></i></div>
              <div class="menu-info">
                  <h3>Insecticidas</h3>
                  <p>${insecticidas.length} productos</p>
              </div>
          </div>
          <div class="menu-card" onclick="openCategory('RODENTICIDAS')">
              <div class="menu-icon" style="color: var(--rodenticida-color); background: rgba(245, 158, 11, 0.1);"><i class="fas fa-mouse"></i></div>
              <div class="menu-info">
                  <h3>Rodenticidas</h3>
                  <p>${rodenticidas.length} productos</p>
              </div>
          </div>
          <div class="menu-card" onclick="openCategory('BIOCIDAS')">
              <div class="menu-icon" style="color: var(--desinfectante-color); background: rgba(6, 182, 212, 0.1);"><i class="fas fa-shield-virus"></i></div>
              <div class="menu-info">
                  <h3>Biocidas y Otros</h3>
                  <p>${biocidas.length} productos</p>
              </div>
          </div>
          <div class="menu-card" onclick="openCategory('CADUCIDAD')" style="border-left: 4px solid var(--danger);">
              <div class="menu-icon" style="color: var(--danger); background: rgba(239, 68, 68, 0.1);"><i class="fas fa-calendar-times"></i></div>
              <div class="menu-info">
                  <h3>Próximos a Caducar</h3>
                  <p>${caducadosOProximos.length} productos</p>
              </div>
          </div>
      `;
  }
  
  function openCategory(cat) {
      currentCategory = cat;
      homeMenu.classList.add('hidden');
      productosView.classList.remove('hidden');
      
      let filtered = [];
      let title = "";
      let icon = "";
      
      if (cat === 'INSECTICIDAS') {
          filtered = productos.filter(p => p.categoria === 'INSECTICIDAS');
          title = "Insecticidas";
          icon = 'fas fa-bug';
      } else if (cat === 'RODENTICIDAS') {
          filtered = productos.filter(p => p.categoria === 'RODENTICIDAS');
          title = "Rodenticidas";
          icon = 'fas fa-mouse';
      } else if (cat === 'BIOCIDAS') {
          filtered = productos.filter(p => p.categoria === 'DESINFECTANTES' || p.categoria === 'OTROS');
          title = "Biocidas y Otros";
          icon = 'fas fa-shield-virus';
      } else if (cat === 'CADUCIDAD') {
          const hoy = new Date();
          filtered = productos.filter(p => {
              if (!p.fecha_caducidad) return false;
              const f = new Date(p.fecha_caducidad);
              const diff = (f - hoy) / (1000 * 60 * 60 * 24);
              return diff <= 30;
          });
          title = "Próximos a Caducar";
          icon = 'fas fa-calendar-times';
      }
      
      categoryHeader.innerHTML = `<h2><i class="${icon}"></i> ${title}</h2>`;
      renderProducts(filtered);
  }

  // Renderizar Lista
  function renderProducts(productsToRender) {
      container.innerHTML = '';
      
      if (productsToRender.length === 0) {
          noResults.classList.remove('hidden');
          return;
      }
      
      noResults.classList.add('hidden');
      
      const grid = document.createElement('div');
      grid.className = 'grid';
      
      productsToRender.forEach(item => {
          grid.appendChild(createProductCard(item));
      });
      
      container.appendChild(grid);
  }
  
  function createProductCard(product) {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.onclick = () => openModal(product);
      
      const imgSrc = product.imagen;
      
      let secProp = product.registro ? `Nº Registro: ${product.registro}` : 'Nº Registro: -';
  
      let plazoBadgeHTML = '';
      if (product.plazoSeguridad && product.plazoSeguridad.trim().toUpperCase() !== 'NA' && product.plazoSeguridad.trim() !== '') {
          plazoBadgeHTML = `<div style="color: var(--danger); font-size: 0.75rem; font-weight: 600; margin-top: 5px;"><i class="fas fa-exclamation-triangle"></i> Plazo seg.: ${product.plazoSeguridad}</div>`;
      } else {
          plazoBadgeHTML = `<div style="color: var(--insecticida-color); font-size: 0.75rem; font-weight: 600; margin-top: 5px;"><i class="fas fa-check-circle"></i> Plazo seg.: No aplica</div>`;
      }

      let caducidadHTML = '';
      if (product.fecha_caducidad) {
          const hoy = new Date();
          const fechaCad = new Date(product.fecha_caducidad);
          const diffTiempo = fechaCad - hoy;
          const diffDias = Math.ceil(diffTiempo / (1000 * 60 * 60 * 24));

          if (diffDias < 0) {
              caducidadHTML = `<div class="expiry-badge expiry-red"><i class="fas fa-calendar-times"></i> CADUCADO</div>`;
          } else if (diffDias <= 30) {
              caducidadHTML = `<div class="expiry-badge expiry-orange"><i class="fas fa-hourglass-half"></i> CADUCA EN ${diffDias} DÍAS</div>`;
          }
      }

      card.innerHTML = `
          <div class="card-image-thumbnail">
              ${imgSrc ? `<img src="${imgSrc}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">` : '<i class="fas fa-camera"></i>'}
          </div>
          <div class="card-info">
              <h3 class="product-name">${product.nombre}</h3>
              <div class="card-lote">${product.lote ? `Lote: ${product.lote}` : 'Lote: -'}</div>
              <p class="product-subtitle">${secProp}</p>
              ${plazoBadgeHTML}
              ${caducidadHTML}
          </div>
          <div class="category-badge ${product.categoria === 'INSECTICIDAS' ? 'badge-insecticidas' : product.categoria === 'RODENTICIDAS' ? 'badge-rodenticidas' : product.categoria === 'DESINFECTANTES' ? 'badge-desinfectantes' : 'badge-otros'}">
              ${product.categoria.substring(0,3)}
          </div>
      `;
      return card;
  }
  
  // Buscar
  searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      
      if (term.trim() === '') {
          if (currentCategory) {
              openCategory(currentCategory);
          } else {
              renderMenu();
          }
          return;
      }
      
      homeMenu.classList.add('hidden');
      productosView.classList.remove('hidden');
      categoryHeader.innerHTML = `<h2><i class="fas fa-search"></i> Resultados de búsqueda</h2>`;
      
      const filtered = productos.filter(p => {
          return p.nombre.toLowerCase().includes(term) ||
                 (p.materiaActiva && p.materiaActiva.toLowerCase().includes(term)) ||
                 (p.sustanciaActiva && p.sustanciaActiva.toLowerCase().includes(term)) ||
                 (p.registro && p.registro.toLowerCase().includes(term)) ||
                 (p.lote && p.lote.toLowerCase().includes(term));
      });
      renderProducts(filtered);
  });
  
  // Detail Modal
  function openModal(product) {
      currentProductId = product.id;
      const imgSrc = product.imagen;
      
      let propsHTML = '';
      if (product.categoria === 'RODENTICIDAS') {
          propsHTML = `
              <div class="prop-item"><div class="prop-label">Sustancia Activa</div><div class="prop-value">${product.sustanciaActiva || '-'}</div></div>
              <div class="prop-item"><div class="prop-label">Nº Registro</div><div class="prop-value">${product.registro || '-'}</div></div>
              <div class="prop-item"><div class="prop-label">Formulación</div><div class="prop-value">${product.formulacion || '-'}</div></div>
          `;
      } else {
          propsHTML = `
              <div class="prop-item"><div class="prop-label">Materia Activa / Composición</div><div class="prop-value">${product.materiaActiva || '-'}</div></div>
              <div class="prop-item"><div class="prop-label">Nº Registro</div><div class="prop-value">${product.registro || '-'}</div></div>
          `;
      }
  
      if (product.plaga && product.plaga.trim() !== '') {
          propsHTML += `<div class="prop-item"><div class="prop-label">Plaga Diana</div><div class="prop-value">${product.plaga}</div></div>`;
      }
      
      if (product.metodoAplicacion && product.metodoAplicacion.trim() !== '') {
          propsHTML += `<div class="prop-item"><div class="prop-label">Método de Aplicación</div><div class="prop-value">${product.metodoAplicacion}</div></div>`;
      }
      
      if (product.lote && product.lote.trim() !== '') {
          propsHTML += `<div class="prop-item"><div class="prop-label">Lote</div><div class="prop-value">${product.lote}</div></div>`;
      }
      
      let plazoStr = product.plazoSeguridad && product.plazoSeguridad.trim() !== '' ? product.plazoSeguridad : 'No aplica';
      let plazoColor = (plazoStr.toUpperCase() !== 'NA' && plazoStr !== 'No aplica') ? 'var(--danger)' : 'var(--insecticida-color)';
      propsHTML += `<div class="prop-item" style="border-left-color: ${plazoColor};"><div class="prop-label">Plazo de Seguridad</div><div class="prop-value" style="color: ${plazoColor}; font-weight: 600;">${plazoStr}</div></div>`;
      
      if (product.fecha_caducidad) {
          propsHTML += `<div class="prop-item"><div class="prop-label">Fecha de Caducidad</div><div class="prop-value">${product.fecha_caducidad}</div></div>`;
      }

      let sdsHTML = '';
      if (product.ficha_seguridad_url) {
          sdsHTML = `
              <div class="sds-container">
                  <a href="${product.ficha_seguridad_url}" target="_blank" class="sds-btn">
                      <i class="fas fa-file-pdf"></i> Ver Ficha de Seguridad
                  </a>
              </div>
          `;
      }

      const badgeCls = product.categoria === 'INSECTICIDAS' ? 'badge-insecticidas' : product.categoria === 'RODENTICIDAS' ? 'badge-rodenticidas' : product.categoria === 'DESINFECTANTES' ? 'badge-desinfectantes' : 'badge-otros';
  
      modalBody.innerHTML = `
          <div class="detail-header">
              <span class="detail-cat ${badgeCls}">${product.categoria}</span>
              <h2 class="detail-title">${product.nombre}</h2>
          </div>
          
          <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 25px; margin-top: 10px;">
              <div id="imageContainer" style="width: 140px; height: 140px; border-radius: 20px; background: rgba(255, 255, 255, 0.05); border: 2px dashed var(--card-border); display: flex; justify-content: center; align-items: center; overflow: hidden; margin-bottom: 15px;">
                  ${imgSrc 
                      ? `<img src="${imgSrc}" style="width: 100%; height: 100%; object-fit: cover;" id="productImage">` 
                      : `<div style="color: var(--text-secondary); display: flex; flex-direction: column; align-items: center;"><i class="fas fa-image" style="font-size: 2.5rem; opacity: 0.5;"></i></div>`
                  }
              </div>
              <label for="imageUpload" class="attach-btn" id="attachBtnLabel">
                  <i class="fas fa-camera"></i> ${imgSrc ? 'Cambiar Foto' : 'Añadir Foto'}
              </label>
              <input type="file" id="imageUpload" accept="image/*" style="display: none;">
          </div>
          
          <div class="prop-list">
              ${propsHTML}
          </div>
          ${sdsHTML}
      `;
      
      document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
      
      modal.classList.add('show');
  }
  
  closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => {
          refreshCurrentView(); // Refresh to show thumbnail changes
      }, 300);
  });
  
  detailDeleteBtn.addEventListener('click', async () => {
      if(confirm('¿Seguro que quieres eliminar este producto?')) {
          const { error } = await supabaseClient.from('productos').delete().eq('id', currentProductId);
          if (error) console.error('Error deleting:', error);
          
          await fetchProducts();
          modal.classList.remove('show');
      }
  });
  
  // Resize and save image to localStorage using Canvas
  function handleImageUpload(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(event) {
          const img = new Image();
          img.onload = function() {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              const MAX_WIDTH = 800;
              const MAX_HEIGHT = 800;
              let width = img.width;
              let height = img.height;
              
              if (width > height) {
                  if (width > MAX_WIDTH) {
                      height *= MAX_WIDTH / width;
                      width = MAX_WIDTH;
                  }
              } else {
                  if (height > MAX_HEIGHT) {
                      width *= MAX_HEIGHT / height;
                      height = MAX_HEIGHT;
                  }
              }
              
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0, width, height);
              
              const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
              
              try {
                  const p = productos.find(x => x.id === currentProductId);
                  if (p) {
                      p.imagen = dataUrl;
                      supabaseClient.from('productos').update({ imagen: dataUrl }).eq('id', currentProductId).then(({error}) => {
                          if(error) console.error('Error guardando imagen en DB:', error);
                      });
                  }
                  
                  // Update UI
                  const container = document.getElementById('imageContainer');
                  container.innerHTML = `<img src="${dataUrl}" style="width: 100%; height: 100%; object-fit: cover;" id="productImage">`;
                  
                  const lbl = document.getElementById('attachBtnLabel');
                  if(lbl) lbl.innerHTML = '<i class="fas fa-camera"></i> Cambiar Foto';
              } catch (err) {
                  alert("Error al procesar la imagen.");
              }
          };
          img.src = event.target.result;
      };
      reader.readAsDataURL(file);
  }
  
  // --- FORM LOGIC (ADD / EDIT) ---
  
  formCategoria.addEventListener('change', (e) => {
      if (e.target.value === 'RODENTICIDAS') {
          fieldsInsecticida.classList.add('hidden');
          fieldsRodenticida.classList.remove('hidden');
      } else {
          fieldsInsecticida.classList.remove('hidden');
          fieldsRodenticida.classList.add('hidden');
      }
  });
  
  addBtn.addEventListener('click', () => {
      formTitle.innerText = "Añadir Producto";
      productForm.reset();
      document.getElementById('formProductId').value = '';
      document.getElementById('sdsFileName').innerText = 'Adjuntar Ficha (PDF/Imagen)';
      formCategoria.dispatchEvent(new Event('change'));
      btnDelete.classList.add('hidden');
      formModal.classList.add('show');
  });
  
  editBtn.addEventListener('click', () => {
      const p = productos.find(x => x.id === currentProductId);
      if (!p) return;
  
      formTitle.innerText = "Editar Producto";
      document.getElementById('formProductId').value = p.id;
      document.getElementById('formCategoria').value = p.categoria;
      formCategoria.dispatchEvent(new Event('change'));
      
      document.getElementById('formNombre').value = p.nombre || '';
      document.getElementById('formRegistro').value = p.registro || '';
      document.getElementById('formLote').value = p.lote || '';
      document.getElementById('formPlazoSeguridad').value = p.plazoSeguridad || '';
      document.getElementById('formMetodoAplicacion').value = p.metodoAplicacion || '';
      document.getElementById('formPlaga').value = p.plaga || '';
      document.getElementById('formFechaCaducidad').value = p.fecha_caducidad || '';
      formFichaSeguridad.value = ''; // Reset file input
      document.getElementById('sdsFileName').innerText = 'Adjuntar Ficha (PDF/Imagen)';
      
      if (p.categoria === 'RODENTICIDAS') {
          document.getElementById('formSustanciaActiva').value = p.sustanciaActiva || '';
          document.getElementById('formFormulacion').value = p.formulacion || '';
      } else {
          document.getElementById('formMateriaActiva').value = p.materiaActiva || '';
      }
      
      btnDelete.classList.remove('hidden');
      modal.classList.remove('show');
      formModal.classList.add('show');
  });
  
  closeFormModal.addEventListener('click', () => {
      formModal.classList.remove('show');
  });
  
  productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const isEdit = document.getElementById('formProductId').value !== '';
      const cat = document.getElementById('formCategoria').value;
      const nombre = document.getElementById('formNombre').value;
      
      const newProduct = {
          id: isEdit ? document.getElementById('formProductId').value : 'prod-' + Date.now(),
          categoria: cat,
          nombre: nombre,
          registro: document.getElementById('formRegistro').value,
          lote: document.getElementById('formLote').value,
          plazoSeguridad: document.getElementById('formPlazoSeguridad').value,
          metodoAplicacion: document.getElementById('formMetodoAplicacion').value,
          plaga: document.getElementById('formPlaga').value
      };
      
      if (cat === 'RODENTICIDAS') {
          newProduct.sustanciaActiva = document.getElementById('formSustanciaActiva').value;
          newProduct.formulacion = document.getElementById('formFormulacion').value;
      } else {
          newProduct.materiaActiva = document.getElementById('formMateriaActiva').value;
      }
      
      if (isEdit) {
          const oldProduct = productos.find(p => p.id === newProduct.id);
          if (oldProduct) {
              if (oldProduct.imagen) newProduct.imagen = oldProduct.imagen;
              if (oldProduct.ficha_seguridad_url) newProduct.ficha_seguridad_url = oldProduct.ficha_seguridad_url;
          }
      }

      // Handle SDS upload if a file is selected
      const sdsFile = formFichaSeguridad.files[0];
      if (sdsFile) {
          const sdsUrl = await uploadSDS(sdsFile, newProduct.id);
          if (sdsUrl) {
              newProduct.ficha_seguridad_url = sdsUrl;
          }
      }

      newProduct.fecha_caducidad = formFechaCaducidad.value || null;

      // Upsert to Supabase
      const { error } = await supabaseClient.from('productos').upsert([newProduct]);
      if (error) {
          console.error("Error saving:", error);
          alert("Error guardando el producto en DB");
      }
      
      await fetchProducts();
      
      searchInput.value = ''; // clear search when adding
      formModal.classList.remove('show');
  });

  async function uploadSDS(file, productId) {
      try {
          const fileExt = file.name.split('.').pop();
          const fileName = `${productId}_sds_${Date.now()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { data, error } = await supabaseClient.storage
              .from('fichas_seguridad')
              .upload(filePath, file);

          if (error) throw error;

          const { data: { publicUrl } } = supabaseClient.storage
              .from('fichas_seguridad')
              .getPublicUrl(filePath);

          return publicUrl;
      } catch (err) {
          console.error('Error uploading SDS:', err);
          alert("Error al subir la ficha de seguridad");
          return null;
      }
  }
  
  btnDelete.addEventListener('click', async () => {
      if(confirm('¿Seguro que quieres eliminar este producto?')) {
          const id = document.getElementById('formProductId').value;
          
          const { error } = await supabaseClient.from('productos').delete().eq('id', id);
          if (error) console.error("Error deleting:", error);

          await fetchProducts();
          formModal.classList.remove('show');
      }
  });

// --- GOOGLE DRIVE BACKUP ---
let tokenClient;

function initGoogleAuth() {
    if (!tokenClient && typeof google !== 'undefined') {
        tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: '287885156256-g76u3vdl8eftq2q1jta8n0rvgkl93hnm.apps.googleusercontent.com',
            scope: 'https://www.googleapis.com/auth/drive.file',
            callback: async (tokenResponse) => {
                if (tokenResponse && tokenResponse.access_token) {
                    await executeBackup(tokenResponse.access_token);
                }
            },
        });
    }
}

window.backupToDrive = function() {
    if (typeof google === 'undefined') {
        alert("Cargando servicios de Google... Comprueba tu conexión e inténtalo de nuevo.");
        return;
    }
    initGoogleAuth();
    tokenClient.requestAccessToken();
};

async function executeBackup(accessToken) {
    const btn = document.getElementById('backup-btn');
    const originalIcon = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    btn.disabled = true;

    try {
        if (!productos || productos.length === 0) throw new Error("No hay productos para exportar.");
        
        const headers = Object.keys(productos[0]);
        let csvContent = "\uFEFF";
        csvContent += headers.join(',') + "\r\n";
        
        productos.forEach(row => {
            const rowData = headers.map(header => {
                let val = row[header];
                if (val === null || val === undefined) val = "";
                val = String(val).replace(/"/g, '""');
                if (val.search(/("|,|\n)/g) >= 0) val = `"${val}"`;
                return val;
            });
            csvContent += rowData.join(',') + "\r\n";
        });

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        
        const appName = "Catalogo_Productos";
        const dateStr = new Date().toISOString().split('T')[0];
        const fileName = `Respaldo_${appName}_${dateStr}.csv`;
        
        const metadata = { name: fileName, mimeType: 'text/csv' };
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', blob);

        const uploadRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + accessToken },
            body: form
        });
        
        if (!uploadRes.ok) {
            const errData = await uploadRes.json();
            throw new Error(errData.error?.message || "Error al subir el archivo a Google Drive");
        }
        
        alert("¡Copia de seguridad realizada con éxito!\n\nEl archivo '" + fileName + "' se ha guardado en tu Google Drive.");
    } catch (err) {
        console.error("Error en backup:", err);
        alert("Error al realizar la copia: " + err.message);
    } finally {
        btn.innerHTML = originalIcon;
        btn.disabled = false;
    }
}
