import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import store from '../../store'
import { Input, Space, Typography, Flex } from 'antd'

const { Text, Link } = Typography

export const DefaultHeaderContent = observer(() => {
	const { headerContent, users } = store
	const { usersFilter, setUserFilter, getUsers } = users
	const [searchText, setSearchText] = useState('')
	let timeout: NodeJS.Timeout
	const onSearch = (text: string) => {
		clearTimeout(timeout)
		setUserFilter({ search: text })
		setSearchText(text)

		timeout = setTimeout(async () => {
			// выполнить поиск по запросу query
			await getUsers()
		}, 500)
	}
	switch (headerContent) {
		case 'search':
			return (
				<Flex align='center' justify='flex-end' style={{ height: '100%' }}>
					<Input
						value={searchText || usersFilter.search}
						placeholder='Начните ввод'
						allowClear
						onChange={(e) => onSearch(e.target.value)}
						style={{ width: 304 }}
					/>
				</Flex>
			)

		default:
			return (
				<Space>
					<Text>Спецмаш</Text>
				</Space>
			)
	}
})
