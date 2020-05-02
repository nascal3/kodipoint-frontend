const superRoutes = [
  { title: 'Landlords', icon: 'mdi-account-tie', route: '/landlords' },
  { title: 'Tenants', icon: 'mdi-account-group', route: '/tenants' },
  { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
]

const adminRoutes = [
  { title: 'Landlords', icon: 'mdi-account-tie', route: '/landlords' },
  { title: 'Tenants', icon: 'mdi-account-group', route: '/tenants' },
  { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
]

const landlordRoutes = [
  { title: 'Properties', icon: 'mdi-home-city', route: '/properties' },
  { title: 'Tenants', icon: 'mdi-account-group', route: '/tenants' },
  { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
]

const tenantRoutes = [
  { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
]

const landlordTenantRoutes = [
  { title: 'Properties', icon: 'mdi-home-city', route: '/properties' },
  { title: 'Tenants', icon: 'mdi-account-group', route: '/tenants' },
  { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
]

const routePermissions = {
  'superUser': superRoutes,
  'adminUser': adminRoutes,
  'landlordUser': landlordRoutes,
  'tenantUser': tenantRoutes,
  'landlordTenantUser': landlordTenantRoutes
}

export {
  routePermissions
}
