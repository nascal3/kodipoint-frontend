import { mapGetters } from 'vuex'

const checkLandlordApproval = {
  computed: {
    ...mapGetters({
      userInfo: ['configs/loggedInUserInfo']
    }),
    isLandlordRole () {
      return this.userInfo.role === 'landlord' || this.userInfo.role === 'landlordTenant'
    }
  },
  methods: {
    checkLandlordApproval () {
      if (this.isLandlordRole) {
        setTimeout(async () => {
          if (!this.userInfo.approved) await this.$router.replace('/profile')
        }, 500)
      }
    }
  }
}

export default checkLandlordApproval
