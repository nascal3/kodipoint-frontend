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
  showLoaderInvoice: false,
  errorState: false,
  tenantIdDuplicationError: false,
  invoiceDuplicationError: false,
  moveInDuplicationError: false,
  noVacancyError: false,
  dateFrom: '',
  dateTo: '',
  tenantRentalRecordSelected: {},
  tenantInvoiceSelected: {},
  showMoveTenantDialog: { 'open': false, 'edit': false },
  showTenantInvoiceDialog: { 'open': false, 'edit': false }
}

export default state
