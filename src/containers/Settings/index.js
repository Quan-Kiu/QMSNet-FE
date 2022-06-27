import React from 'react'
import PropTypes from 'prop-types'
import { SettingWrapper } from './Setting.style'
import { Tabs } from 'antd'
import Layout from '../../components/Common/Layout'
import Information from '../User/Profile/Form/Infomation'
import Service from './Tabs/Service'
import Privacy from './Tabs/Privacy'
const TabPane = Tabs.TabPane

const Settings = props => {
    return (
        <Layout>
            <SettingWrapper>
                <Tabs destroyInactiveTabPane={true} tabPosition={"left"}>
                    <TabPane tab={<>
                        <img src="/assets/images/setting.png" alt="" />
                        Chỉnh sửa trang cá nhân
                    </>} key="1">
                        <Information />
                    </TabPane>
                    <TabPane tab={
                        <>
                            <img src="/assets/images/service.png" alt="" />
                            Đổi mật khẩu
                        </>
                    } key="2">
                        <Service />
                    </TabPane>
                    <TabPane tab={
                        <>
                            <img src="/assets/images/private.png" alt="" />
                            Quyền riêng tư
                        </>
                    } key="3">
                        <Privacy />
                    </TabPane>
                </Tabs>
            </SettingWrapper>
        </Layout>
    )
}

Settings.propTypes = {}

export default Settings