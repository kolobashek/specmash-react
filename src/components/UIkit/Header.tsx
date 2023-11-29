import React, { useCallback, useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import store from '../../store'
import { Input, Space, Typography, Flex } from 'antd'
import _ from 'lodash'

const { Text, Link } = Typography

export const DefaultHeaderContent = observer(() => {
	const { headerContent, users } = store
	const { usersFilter, setUserFilter } = users
	const [searchText, setSearchText] = useState('')
	useEffect(() => {
		if (headerContent === 'userSearch') {
			usersFilter.search && setSearchText(usersFilter.search)
		}
	}, [])
	const debounced = useRef(_.debounce((text) => setUserFilter({ search: text }), 800))
	const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		debounced.current.cancel()
		const text = e.currentTarget.value
		setSearchText(text)
		debounced.current(text)
	}
	switch (headerContent) {
		case 'userSearch':
			return (
				<Flex align='center' justify='flex-end' style={{ height: '100%' }}>
					<Input
						value={searchText}
						placeholder='Начните ввод'
						allowClear
						onChange={onSearch}
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
