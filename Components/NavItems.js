const routes = [
    { name: 'Home', path: '/home/' },
    { name: 'Boek een les', path: '/reserve/' },
    { name: "Gallerij", path: '/gallery/' },
    { name: 'Contact', path: '/contact/' }
  ];
  
  export function NavItems() {
    return routes.map(route => `
      <li class="nav-item">
        <a class="nav-link" href="${route.path}">${route.name}</a>
      </li>
    `).join('');
  }
  