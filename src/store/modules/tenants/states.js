const state = {
  tenantsListType: 'allTenants',
  tenants: [],
  tenantSearchResults: [],
  tenantRentalRecords: [],
  tenantInvoiceRecords: [],
  tenantRentedProperties: [],
  selectedTenant: {},
  noSearchResults: false,
  showLoader: false,
  errorState: false,
  tenantIdDuplicationError: false,
  moveInDuplicationError: false,
  noVacancyError: false,
  tenantRentalRecordSelected: {},
  tenantInvoiceRecordSelected: {},
  showMoveTenantDialog: { 'open': false, 'edit': false },
  showTenantInvoiceDialog: { 'open': false, 'edit': false }
}

export default state
