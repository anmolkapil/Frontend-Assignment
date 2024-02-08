import DynamicForm from '@/components/DynamicForm/DynamicForm'
import JsonEditor from './components/JsonEditor'

import Pizza from '@/assets/pizza.json'

import { useState } from 'react'

import type { UIParameter } from './types/types'

function App() {
	const [schema, setSchema] = useState<any>(Pizza)

	const isValidUIParameter = (param: any): param is UIParameter => {
		return (
			typeof param.sort === 'number' &&
			typeof param.label === 'string' &&
			typeof param.jsonKey === 'string'
		)
	}

	const handleGenerateForm = (json: string) => {
		try {
			const parsedJson = JSON.parse(json)
			if (Array.isArray(parsedJson) && parsedJson.every(isValidUIParameter)) {
				setSchema(parsedJson)
			} else {
				throw new Error('Invalid config')
			}
		} catch {
			window.alert('JSON error or invalid config')
		}
	}

	return (
		<div className='flex flex-col md:flex-row m-2 gap-2'>
			<div className='flex-1'>
				<JsonEditor onGenerateForm={handleGenerateForm} />
			</div>
			<div className='flex-1 '>
				<DynamicForm schema={schema} />
			</div>
		</div>
	)
}

export default App
