import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import {Button} from '../../../components/common/Button'
import {NavigationActions} from '../../../utils'
import {connect} from 'dva'
@connect(({test}) => ({test}))
class Detail extends Component {
  static navigationOptions = {
    title: 'Detail',
  }

  gotoDetail = () => {
    this.props.dispatch(NavigationActions.navigate({ routeName: 'test/detail' }))
  }

  goBack = () => {
    this.props.dispatch(NavigationActions.back({ routeName: 'test/account' }))
  }

  render() {
    return (
      <View style={styles.container}>
        <Button text="Goto Detail" onPress={this.gotoDetail} />
        <Button text="Go Back" onPress={this.goBack} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Detail
