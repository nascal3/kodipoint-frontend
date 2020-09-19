const userProfileAvatar = {
  data: () => ({
    placeholderImage: require(`@/assets/images/avatar.jpg`)
  }),
  methods: {
    imageSource (userInfo) {
      if (!userInfo || !userInfo.avatar) return this.placeholderImage
      const apiURL = process.env.API_URL
      return `${apiURL}/file${userInfo.avatar}`
    }
  }
}

export default userProfileAvatar
