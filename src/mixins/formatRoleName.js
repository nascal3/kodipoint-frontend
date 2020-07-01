import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      user: ['auth/token']
    }),
    roleName () {
      const role = this.user.user.role
      const matchedRole = {
        landlordTenant: 'Landlord & Tenant',
        landlord: 'Landlord',
        admin: 'System Administrator',
        superU: 'Super User',
        tenant: 'Tenant'
      }
      return matchedRole[role]
    }
  }
}
