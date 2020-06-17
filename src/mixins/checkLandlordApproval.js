import { mapGetters } from 'vuex'

const checkLandlordApproval = {
  computed: {
    ...mapGetters({
      token: ['auth/token'],
      userInfo: ['configs/loggedInUserInfo']
    })
  },
  methods: {
    checkLandlordApproval () {
      if (this.token.user.role === 'landlord' || this.token.user.role === 'landlordTenant') {
        setTimeout(() => {
          if (!this.userInfo.approved) this.$router.push('/profile')
        }, 500)
      }
    }
  }
}

export default checkLandlordApproval
