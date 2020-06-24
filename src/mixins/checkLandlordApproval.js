import { mapGetters } from 'vuex'

const checkLandlordApproval = {
  computed: {
    ...mapGetters({
      token: ['auth/token'],
      userInfo: ['configs/loggedInUserInfo']
    }),
    isLandlordRole () {
      return this.token.user.role === 'landlord' || this.token.user.role === 'landlordTenant'
    }
  },
  methods: {
    checkLandlordApproval () {
      if (this.isLandlordRole) {
        setTimeout(async () => {
          if (!this.userInfo.approved) await this.$router.replace('/profile')
        }, 300)
      }
    }
  }
}

export default checkLandlordApproval
