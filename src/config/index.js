const superUserRoutes = [
  { title: 'Landlords', icon: 'mdi-account-tie', route: '/landlords' },
  { title: 'Tenants', icon: 'mdi-account-group', route: '/tenants' },
  { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
]

const adminUserRoutes = [
  { title: 'Landlords', icon: 'mdi-account-tie', route: '/landlords' },
  { title: 'Tenants', icon: 'mdi-account-group', route: '/tenants' },
  { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
]

const landlordUserRoutes = [
  { title: 'Properties', icon: 'mdi-home-city', route: '/properties' },
  { title: 'Tenants', icon: 'mdi-account-group', route: '/tenants' },
  { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
]

const tenantUserRoutes = [
  { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
]

const landlordTenantUserRoutes = [
  { title: 'Properties', icon: 'mdi-home-city', route: '/properties' },
  { title: 'Tenants', icon: 'mdi-account-group', route: '/tenants' },
  { title: 'Finance', icon: 'mdi-bank', route: '/finance' }
]

const mappedRoutePermissions = {
  'superUser': superUserRoutes,
  'adminUser': adminUserRoutes,
  'landlordUser': landlordUserRoutes,
  'tenantUser': tenantUserRoutes,
  'landlordTenantUser': landlordTenantUserRoutes
}

const mapCoordinates = {
  'noCoordinates': { lat: -1.288360, lng: 36.822092 },
  'nairobi': { lat: -1.28333, lng: 36.81667 }
}

export {
  mappedRoutePermissions,
  mapCoordinates
}
