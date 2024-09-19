Page({
  data: {
    latitude: 0,
    longitude: 0,
    markers: [],
    polyline: [],
    modes: ['步行🚶', '骑行🚴', '驾车🚗'],
    modeIndex: 0,
    distance: 0,
    duration: 0,
    searchQuery: '',
    suggestions: [],
    destination: null,
    apiKey: 'GTDBZ-LWIL3-RVP3J-R5JPS-CNCN6-IKFYI',
    favorites: [] // 收藏夹数据
  },

  onLoad: function() {
    this.getLocation();
    this.loadFavorites(); // 加载收藏夹数据
  },

  getLocation: function() {
    const that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        that.setData({
          latitude: latitude,
          longitude: longitude,
          markers: [{
            id: 1,
            latitude: latitude,
            longitude: longitude,
            title: '当前位置',
            iconPath: '/images/location.png',
            width: 32,
            height: 32
          }]
        });
      },
      fail(err) {
        console.error(err);
      }
    });
  },

  onInput: function(e) {
    const query = e.detail.value;
    this.setData({
      searchQuery: query
    });

    if (query.length > 0) {
      this.getSuggestions(query);
    } else {
      this.setData({
        suggestions: []
      });
    }
  },

  getSuggestions: function(query) {
    const that = this;
    wx.request({
      url: `https://apis.map.qq.com/ws/place/v1/suggestion/?region=全国&keyword=${query}&key=${this.data.apiKey}`,
      success(res) {
        console.log('Suggestion response:', res);
        if (res.data.status === 0) {
          that.setData({
            suggestions: res.data.data
          });
        } else {
          wx.showToast({
            title: '获取建议失败',
            icon: 'none'
          });
        }
      },
      fail(err) {
        console.error(err);
      }
    });
  },

  onSelectSuggestion: function(e) {
    const latitude = e.currentTarget.dataset.lat;
    const longitude = e.currentTarget.dataset.lng;
    const title = e.currentTarget.dataset.title;

    const address = { latitude, longitude, title };

    this.setData({
      destination: address,
      markers: [...this.data.markers, {
        id: 2,
        latitude,
        longitude,
        title,
        iconPath: '/images/destination.png',
        width: 32,
        height: 32
      }],
      suggestions: [],
      searchQuery: title
    });
  },

  addToFavorites: function(e) {
    console.log('Adding to favorites');
    const latitude = e.currentTarget.dataset.lat;
    const longitude = e.currentTarget.dataset.lng;
    const title = e.currentTarget.dataset.title;

    const address = { latitude, longitude, title };

    const favorites = this.data.favorites;
    const existingIndex = favorites.findIndex(item => item.title === address.title);
    if (existingIndex === -1) {
      favorites.push(address);
      this.setData({ favorites });
      this.saveFavorites();
      wx.showToast({
        title: '地址已收藏',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '地址已在收藏夹中',
        icon: 'none'
      });
    }
  },

  loadFavorites: function() {
    const favorites = wx.getStorageSync('favorites') || [];
    this.setData({ favorites });
  },

  saveFavorites: function() {
    wx.setStorageSync('favorites', this.data.favorites);
  },

  onSelectFavorite: function(e) {
    const address = e.currentTarget.dataset.address;
    this.setData({
      destination: address,
      markers: [...this.data.markers, {
        id: 2,
        latitude: address.latitude,
        longitude: address.longitude,
        title: address.title,
        iconPath: '/images/destination.png',
        width: 32,
        height: 32
      }],
      searchQuery: address.title
    });
    wx.showToast({
      title: '目的地已设置',
      icon: 'success'
    });
  },

  onModeChange: function(e) {
    this.setData({
      modeIndex: e.detail.value
    });
  },

  planRoute: function() {
    if (!this.data.destination) {
      wx.showToast({
        title: '请先搜索目的地',
        icon: 'none'
      });
      return;
    }

    const that = this;
    const mode = this.data.modes[this.data.modeIndex];
    const from = `${this.data.latitude},${this.data.longitude}`;
    const to = `${this.data.destination.latitude},${this.data.destination.longitude}`;

    let modeKey;
    switch(mode) {
      case '步行🚶':
        modeKey = 'walking';
        break;
      case '骑行🚴':
        modeKey = 'bicycling';
        break;
      case '驾车🚗':
        modeKey = 'driving';
        break;
    }

    console.log(`Planning route from ${from} to ${to} with mode ${modeKey}`);

    wx.request({
      url: `https://apis.map.qq.com/ws/direction/v1/${modeKey}/?from=${from}&to=${to}&key=${this.data.apiKey}`,
      success(res) {
        console.log('Route response:', res);
        if (res.data.status === 0 && res.data.result && res.data.result.routes && res.data.result.routes.length > 0) {
          const route = res.data.result.routes[0];

          if (route.polyline) {
            const coors = route.polyline;
            const pl = [];
            for (let i = 2; i < coors.length; i++) {
              coors[i] = Number(coors[i - 2]) + Number(coors[i]) / 1000000;
            }
            for (let i = 0; i < coors.length; i += 2) {
              pl.push({ latitude: coors[i], longitude: coors[i + 1] });
            }

            that.setData({
              polyline: [{
                points: pl,
                color: "#FF0000DD",
                width: 4
              }]
            });
          }

          that.setData({
            distance: route.distance,
            duration: route.duration
          });

          wx.showToast({
            title: '路线规划成功',
            icon: 'success'
          });
        } else {
          wx.showToast({
            title: '路线规划失败',
            icon: 'none'
          });
        }
      },
      fail(err) {
        console.error(err);
        wx.showToast({
          title: '路线规划失败',
          icon: 'none'
        });
      }
    });
  }
});
