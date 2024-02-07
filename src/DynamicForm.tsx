import { useForm } from 'react-hook-form'
import Schema from '@/assets/pizza.json'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default function DynamicForm() {
	const { register, handleSubmit, errors, setValue } = useForm()

	const onSubmit = (data) => {
		console.log(data)
	}

	const handleInputChange = (event) => {
		const { name, value } = event.target
		console.log(name)
		setValue(name, value)
	}

	const renderFields = (fields) =>
		fields
			.sort((a, b) => a.sort - b.sort)
			.map((field) => {
				switch (field.uiType) {
					case 'Input':
						return (
							<label>
								{field.label}
								<Input name={field.jsonKey} onChange={handleInputChange} />
							</label>
						)
					case 'Radio':
						return (
							<Tabs
								defaultValue={field.validate.defaultValue}
								className='w-[400px]'
							>
								<TabsList className='grid w-full grid-cols-2'>
									{field.validate.options.map((option) => (
										<TabsTrigger key={option.value} value={option.value}>
											{option.label}
										</TabsTrigger>
									))}
								</TabsList>
							</Tabs>
						)
					case 'Select':
						return (
							<Select
								name={field.jsonKey}
								defaultValue={field.validate.defaultValue}
								onValueChange={handleInputChange}
							>
								<SelectTrigger className='w-[180px]'>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{field.validate.options.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)

					case 'Group':
						return renderFields(field.subParameters)
					default:
						return null
				}
			})

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
			{renderFields(Schema)}

			<Button type='submit'>Submit</Button>
		</form>
	)
}
