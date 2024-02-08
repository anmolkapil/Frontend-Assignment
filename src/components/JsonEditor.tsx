import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

import Pizza from '@/assets/pizza.json'

import { useState } from 'react'

interface JsonEditorProps {
	onGenerateForm: (json: string) => void
}

const JsonEditor: React.FC<JsonEditorProps> = ({ onGenerateForm }) => {
	const [json, setJson] = useState(JSON.stringify(Pizza, null, 2))
	return (
		<div className='h-full flex flex-col'>
			<Textarea
				value={json}
				onChange={(e) => setJson(e.target.value)}
				className='resize-none h-full min-h-[200px]'
				placeholder='Paste your JSON here.'
			/>
			<Button className='w-full mt-2' onClick={() => onGenerateForm(json)}>
				Generate Form
			</Button>
		</div>
	)
}

export default JsonEditor
