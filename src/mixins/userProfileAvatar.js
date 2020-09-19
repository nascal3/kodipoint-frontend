const userProfileAvatar = {
  data: () => ({
    placeholderImage: require(`@/assets/images/avatar.jpg`)
  }),
  methods: {
    imageSource (userInfo) {
      if (!userInfo || !userInfo.avatar) return this.placeholderImage
      const protocol = userInfo.avatar.split(':')[0]
      const apiURL = process.env.API_URL
      if (protocol === 'https' || protocol === 'http') return `${userInfo.avatar}`
      return `${apiURL}/file${userInfo.avatar}`
    }
  }
}

export default userProfileAvatar
