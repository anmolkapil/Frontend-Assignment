import DynamicForm from '@/components/DynamicForm/DynamicForm'
import JsonEditor from './components/JsonEditor'

import Pizza from '@/assets/pizza.json'

import { useState } from 'react'

function App() {
	const [schema, setSchema] = useState(Pizza)
	const handleGenerateForm = (json) => {
		try {
			setSchema(JSON.parse(json))
		} catch {
			window.alert('json error')
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
