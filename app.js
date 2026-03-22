const defaultProductos = [
    // INSECTICIDAS
    {
      id: "crawjet-plus",
      categoria: "INSECTICIDAS",
      nombre: "CRAWJET PLUS",
      materiaActiva: "Imidacloprid + Tetrametrina",
      registro: "20-30-10556 / HA",
      plaga: "Cucarachas, hormigas, arañas",
      lote: ""
    },
    {
      id: "mk1-imida-gel",
      categoria: "INSECTICIDAS",
      nombre: "MK1 IMIDA GEL",
      materiaActiva: "Imidacloprid 2,15%",
      registro: "ES/MR(NA)-2018-18-00526",
      plaga: "Cucarachas",
      lote: ""
    },
    {
        id: "hormifin-imidagel",
        categoria: "INSECTICIDAS",
        nombre: "HORMIFIN IMIDAGEL",
        materiaActiva: "Imidacloprid 0,01%",
        registro: "ES/MR(NA)-2018-18-00476",
        plaga: "Hormigas",
        lote: ""
    },
    {
        id: "maxforce-white-ic",
        categoria: "INSECTICIDAS",
        nombre: "MAXFORCE WHITE IC",
        materiaActiva: "Imidacloprid 2,217%",
        registro: "ES/MR(NA)-2019-18-00595",
        plaga: "Cucarachas",
        lote: ""
    },
    {
        id: "maxforce-quantum",
        categoria: "INSECTICIDAS",
        nombre: "MAXFORCE QUANTUM",
        materiaActiva: "Imidacloprid 0,03%",
        registro: "ES/MR(NA)-2018-18-00483",
        plaga: "Hormigas",
        lote: ""
    },
    {
        id: "goliath-gel-new",
        categoria: "INSECTICIDAS",
        nombre: "GOLIATH GEL NEW",
        materiaActiva: "Clotianidina + Piriproxifen",
        registro: "EU-0024951-0000",
        plaga: "Cucarachas",
        lote: ""
    },
    {
        id: "deflow",
        categoria: "INSECTICIDAS",
        nombre: "DEFLOW",
        materiaActiva: "Deltametrina 2,394%",
        registro: "ES/BB(MR)-2017-18-0446",
        plaga: "Cucarachas, hormigas",
        lote: ""
    },
    {
        id: "mythic-sc",
        categoria: "INSECTICIDAS",
        nombre: "MYTHIC SC",
        materiaActiva: "Clorfenapir 10%",
        registro: "19-30-06183 / HA",
        plaga: "Cucarachas, chinches",
        lote: ""
    },
    {
        id: "fendona",
        categoria: "INSECTICIDAS",
        nombre: "FENDONA",
        materiaActiva: "Alfacipermetrina 6%",
        registro: "ES/MR(NA)-2019-18-00633",
        plaga: "Multiespacio (rastreros/voladores)",
        lote: ""
    },
    {
        id: "diptron-etofenprox",
        categoria: "INSECTICIDAS",
        nombre: "DIPTRON con ETOFENPROX",
        materiaActiva: "Etofenprox 10% + Butóxido de Piperonilo 20%",
        registro: "18-30-09355",
        plaga: "",
        lote: ""
    },

    // RODENTICIDAS
    {
        id: "muridox-40-pasta",
        categoria: "RODENTICIDAS",
        nombre: "MURIDOX-40 PASTA",
        registro: "ES/APP(NA)-2018-14-00225",
        sustanciaActiva: "Brodifacoum 0,005%",
        formulacion: "Cebo fresco",
        lote: ""
    },
    {
        id: "muridox-40-bloques",
        categoria: "RODENTICIDAS",
        nombre: "MURIDOX-40 BLOQUES",
        registro: "ES/APP(NA)-2018-14-00232",
        sustanciaActiva: "Brodifacoum 0,005%",
        formulacion: "Bloques",
        lote: ""
    },
    {
        id: "muridox-brodi-p25-pasta",
        categoria: "RODENTICIDAS",
        nombre: "MURIDOX BRODI-P25 PASTA",
        registro: "ES/MR(NA)-2018-14-00534",
        sustanciaActiva: "Brodifacoum 0,0025%",
        formulacion: "Cebo fresco",
        lote: ""
    },
    {
        id: "muridox-brodi-25-pasta",
        categoria: "RODENTICIDAS",
        nombre: "MURIDOX BRODI 25 PASTA",
        registro: "ES/BB(NA)-2018-14-00558",
        sustanciaActiva: "Brodifacoum 0,0025%",
        formulacion: "Cebo fresco",
        lote: ""
    },
    {
        id: "muridox-brodi-p25-bloque",
        categoria: "RODENTICIDAS",
        nombre: "MURIDOX BRODI-P25 BLOQUE",
        registro: "ES/MR(NA)-2018-14-00533",
        sustanciaActiva: "Brodifacoum 0,0025%",
        formulacion: "Bloques",
        lote: ""
    },
    {
        id: "muridox-20-pasta",
        categoria: "RODENTICIDAS",
        nombre: "MURIDOX-20 PASTA",
        registro: "ES/APP(NA)-2018-14-00116",
        sustanciaActiva: "Bromadiolona 0,005%",
        formulacion: "Cebo fresco",
        lote: ""
    },
    {
        id: "muridox-20-bloques",
        categoria: "RODENTICIDAS",
        nombre: "MURIDOX-20 BLOQUES",
        registro: "ES/APP(NA)-2018-14-00115",
        sustanciaActiva: "Bromadiolona 0,005%",
        formulacion: "Bloques",
        lote: ""
    },
    {
        id: "muridox-broma-p25-bloque",
        categoria: "RODENTICIDAS",
        nombre: "MURIDOX BROMA-P25 BLOQUE",
        registro: "ES/MR(NA)-2018-14-00493",
        sustanciaActiva: "Bromadiolona 0,0025%",
        formulacion: "Bloques",
        lote: ""
    },
    {
        id: "muridox-30-pasta",
        categoria: "RODENTICIDAS",
        nombre: "MURIDOX-30 PASTA",
        registro: "ES/APP(NA)-2018-14-00085",
        sustanciaActiva: "Difenacoum 0,005%",
        formulacion: "Cebo fresco",
        lote: ""
    },
    {
        id: "muridox-30-bloques",
        categoria: "RODENTICIDAS",
        nombre: "MURIDOX-30 BLOQUES",
        registro: "ES/APP(NA)-2018-14-00063",
        sustanciaActiva: "Difenacoum 0,005%",
        formulacion: "Bloques",
        lote: ""
    },
    {
        id: "muridox-dife-p25-bloque",
        categoria: "RODENTICIDAS",
        nombre: "MURIDOX DIFE-P25 BLOQUE",
        registro: "ES/MR(NA)-2018-14-00500",
        sustanciaActiva: "Difenacoum 0,0025%",
        formulacion: "Bloques",
        lote: ""
    },
    {
        id: "storm-ultra-secure",
        categoria: "RODENTICIDAS",
        nombre: "STORM ULTRA SECURE",
        registro: "ES/MR(NA)-2019-14-00578",
        sustanciaActiva: "Flocoumafen 0,0025%",
        formulacion: "Bloques",
        lote: ""
    }
  ];
  
  // Storage initialization
  let productos = JSON.parse(localStorage.getItem('productos')) || defaultProductos;
  
  // Elementos DOM
  const container = document.getElementById('productosContainer');
  const searchInput = document.getElementById('searchInput');
  const noResults = document.getElementById('noResults');
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
  
  let currentProductId = null;
  
  // Initial Render
  document.addEventListener('DOMContentLoaded', () => {
      saveProducts(); // Save defaults if empty
      renderProducts(productos);
      
      // Register Service Worker
      if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('sw.js')
          .then(() => console.log('Service Worker Registrado'))
          .catch(err => console.error('Error Service Worker:', err));
      }
  });
  
  function saveProducts() {
      localStorage.setItem('productos', JSON.stringify(productos));
  }
  
  // Renderizar Lista
  function renderProducts(productsToRender) {
      container.innerHTML = '';
      
      if (productsToRender.length === 0) {
          noResults.classList.remove('hidden');
          return;
      }
      
      noResults.classList.add('hidden');
      
      const insecticidas = productsToRender.filter(p => p.categoria === 'INSECTICIDAS');
      const rodenticidas = productsToRender.filter(p => p.categoria === 'RODENTICIDAS');
      
      if (insecticidas.length > 0) {
          container.appendChild(createCategorySection('INSECTICIDAS', insecticidas, 'fas fa-bug', 'insecticidas-title'));
      }
      
      if (rodenticidas.length > 0) {
          container.appendChild(createCategorySection('RODENTICIDAS', rodenticidas, 'fas fa-mouse', 'rodenticidas-title'));
      }
  }
  
  function createCategorySection(title, items, iconClass, titleClass) {
      const section = document.createElement('div');
      section.className = 'category-section';
      
      const titleEl = document.createElement('h2');
      titleEl.className = `category-title ${titleClass}`;
      titleEl.innerHTML = `<i class="${iconClass}"></i> ${title}`;
      section.appendChild(titleEl);
      
      const grid = document.createElement('div');
      grid.className = 'grid';
      
      items.forEach(item => {
          grid.appendChild(createProductCard(item));
      });
      
      section.appendChild(grid);
      return section;
  }
  
  function createProductCard(product) {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.onclick = () => openModal(product);
      
      const imgSrc = localStorage.getItem(`img_${product.id}`);
      
      let secProp = product.categoria === 'INSECTICIDAS' ? product.materiaActiva : product.sustanciaActiva;
      if (product.lote && product.lote.trim() !== '') {
         secProp += ` • Lote: ${product.lote}`;
      }
  
      let plazoBadgeHTML = '';
      if (product.plazoSeguridad && product.plazoSeguridad.trim().toUpperCase() !== 'NA' && product.plazoSeguridad.trim() !== '') {
          plazoBadgeHTML = `<div style="color: var(--danger); font-size: 0.75rem; font-weight: 600; margin-top: 5px;"><i class="fas fa-exclamation-triangle"></i> Plazo seg.: ${product.plazoSeguridad}</div>`;
      } else {
          plazoBadgeHTML = `<div style="color: var(--insecticida-color); font-size: 0.75rem; font-weight: 600; margin-top: 5px;"><i class="fas fa-check-circle"></i> Plazo seg.: No aplica</div>`;
      }

      card.innerHTML = `
          <div class="card-image-thumbnail">
              ${imgSrc ? `<img src="${imgSrc}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 12px;">` : '<i class="fas fa-camera"></i>'}
          </div>
          <div class="card-info">
              <h3 class="product-name">${product.nombre}</h3>
              <p class="product-subtitle">${secProp}</p>
              ${plazoBadgeHTML}
          </div>
          <div class="category-badge ${product.categoria === 'INSECTICIDAS' ? 'badge-insecticidas' : 'badge-rodenticidas'}">
              ${product.categoria.substring(0,3)}
          </div>
      `;
      return card;
  }
  
  // Buscar
  searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
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
      const imgSrc = localStorage.getItem(`img_${product.id}`);
      
      let propsHTML = '';
      if (product.categoria === 'INSECTICIDAS') {
          propsHTML = `
              <div class="prop-item"><div class="prop-label">Materia Activa</div><div class="prop-value">${product.materiaActiva || '-'}</div></div>
              <div class="prop-item"><div class="prop-label">Nº Registro</div><div class="prop-value">${product.registro || '-'}</div></div>
          `;
      } else {
          propsHTML = `
              <div class="prop-item"><div class="prop-label">Sustancia Activa</div><div class="prop-value">${product.sustanciaActiva || '-'}</div></div>
              <div class="prop-item"><div class="prop-label">Nº Registro</div><div class="prop-value">${product.registro || '-'}</div></div>
              <div class="prop-item"><div class="prop-label">Formulación</div><div class="prop-value">${product.formulacion || '-'}</div></div>
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
      
      const badgeCls = product.categoria === 'INSECTICIDAS' ? 'badge-insecticidas' : 'badge-rodenticidas';
  
      modalBody.innerHTML = `
          <div class="detail-header">
              <span class="detail-cat ${badgeCls}">${product.categoria}</span>
              <h2 class="detail-title">${product.nombre}</h2>
          </div>
          
          <div class="detail-image-container" id="imageContainer">
              ${imgSrc 
                  ? `<img src="${imgSrc}" class="detail-image" id="productImage">` 
                  : `<div class="image-placeholder"><i class="fas fa-image"></i><span>Sin imagen</span></div>`
              }
              <div class="attach-btn-container">
                  <label for="imageUpload" class="attach-btn">
                      <i class="fas fa-camera"></i> ${imgSrc ? 'Cambiar' : 'Adjuntar'} Foto
                  </label>
                  <input type="file" id="imageUpload" accept="image/*">
              </div>
          </div>
          
          <div class="prop-list">
              ${propsHTML}
          </div>
      `;
      
      document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
      
      modal.classList.add('show');
  }
  
  closeModal.addEventListener('click', () => {
      modal.classList.remove('show');
      setTimeout(() => {
          renderProducts(productos); // Refresh to show thumbnail changes
      }, 300);
  });
  
  detailDeleteBtn.addEventListener('click', () => {
      if(confirm('¿Seguro que quieres eliminar este producto?')) {
          productos = productos.filter(p => p.id !== currentProductId);
          localStorage.removeItem(`img_${currentProductId}`);
          saveProducts();
          renderProducts(productos);
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
                  localStorage.setItem(`img_${currentProductId}`, dataUrl);
                  
                  // Update UI
                  const container = document.getElementById('imageContainer');
                  container.innerHTML = `
                      <img src="${dataUrl}" class="detail-image" id="productImage">
                      <div class="attach-btn-container">
                          <label for="imageUpload" class="attach-btn">
                              <i class="fas fa-camera"></i> Cambiar Foto
                          </label>
                          <input type="file" id="imageUpload" accept="image/*">
                      </div>
                  `;
                  document.getElementById('imageUpload').addEventListener('change', handleImageUpload);
              } catch (err) {
                  alert("Error al guardar la imagen. Tal vez se llenó la memoria del navegador.");
              }
          };
          img.src = event.target.result;
      };
      reader.readAsDataURL(file);
  }
  
  // --- FORM LOGIC (ADD / EDIT) ---
  
  formCategoria.addEventListener('change', (e) => {
      if (e.target.value === 'INSECTICIDAS') {
          fieldsInsecticida.classList.remove('hidden');
          fieldsRodenticida.classList.add('hidden');
      } else {
          fieldsInsecticida.classList.add('hidden');
          fieldsRodenticida.classList.remove('hidden');
      }
  });
  
  addBtn.addEventListener('click', () => {
      formTitle.innerText = "Añadir Producto";
      productForm.reset();
      document.getElementById('formProductId').value = '';
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
      
      if (p.categoria === 'INSECTICIDAS') {
          document.getElementById('formMateriaActiva').value = p.materiaActiva || '';
      } else {
          document.getElementById('formSustanciaActiva').value = p.sustanciaActiva || '';
          document.getElementById('formFormulacion').value = p.formulacion || '';
      }
      
      btnDelete.classList.remove('hidden');
      modal.classList.remove('show');
      formModal.classList.add('show');
  });
  
  closeFormModal.addEventListener('click', () => {
      formModal.classList.remove('show');
  });
  
  productForm.addEventListener('submit', (e) => {
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
      
      if (cat === 'INSECTICIDAS') {
          newProduct.materiaActiva = document.getElementById('formMateriaActiva').value;
      } else {
          newProduct.sustanciaActiva = document.getElementById('formSustanciaActiva').value;
          newProduct.formulacion = document.getElementById('formFormulacion').value;
      }
      
      if (isEdit) {
          const index = productos.findIndex(p => p.id === newProduct.id);
          if (index !== -1) productos[index] = newProduct;
      } else {
          productos.push(newProduct);
      }
      
      saveProducts();
      renderProducts(productos);
      searchInput.value = ''; // clear search when adding
      formModal.classList.remove('show');
  });
  
  btnDelete.addEventListener('click', () => {
      if(confirm('¿Seguro que quieres eliminar este producto?')) {
          const id = document.getElementById('formProductId').value;
          productos = productos.filter(p => p.id !== id);
          localStorage.removeItem(`img_${id}`); // cleanup image
          saveProducts();
          renderProducts(productos);
          formModal.classList.remove('show');
      }
  });
