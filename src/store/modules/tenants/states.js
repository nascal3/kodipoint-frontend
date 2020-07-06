const state = {
  tenantsListType: 'allTenants',
  tenants: [],
  tenantSearchResults: [],
  tenantRentalRecords: [],
  selectedTenant: {},
  noSearchResults: false,
  showLoader: false,
  errorState: false,
  tenantIdDuplicationError: false,
  moveInDuplicationError: false,
  noVacancyError: false,
  showManageTenantDialog: false
}

export default state
