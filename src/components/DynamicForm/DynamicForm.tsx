import { useForm } from 'react-hook-form'
import FieldRenderer from './FieldRenderer'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

interface DynamicFormProps {
	schema: any
}

const DynamicForm: React.FC<DynamicFormProps> = ({ schema }) => {
	const form = useForm()

	const [open, setOpen] = useState(false)
	const [result, setResult] = useState('')

	const onSubmit = (data: any) => {
		const jsonData = JSON.stringify(data, null, 2)
		setResult(jsonData)
		setOpen(true)
	}

	const [globalShowAdvanced, setGlobalShowAdvanced] = useState(false)

	useEffect(() => {
		form.reset()
		setGlobalShowAdvanced(false)
	}, [schema])

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-4 p-4 border rounded-lg border-slate-800'
			>
				<Label>
					New {schema[0]?.label?.split(' ')[0]}
					<Separator className='mt-2' />
				</Label>

				<FieldRenderer
					fields={schema}
					form={form}
					parent={null}
					globalShowAdvanced={globalShowAdvanced}
					groupToggle={false}
				/>
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-x-2'>
						<Label htmlFor='global-show-fields'>Show all advanced fields</Label>
						<Switch
							id='global-show-fields'
							className='data-[state=checked]:bg-indigo-600'
							checked={globalShowAdvanced}
							onCheckedChange={(e) => setGlobalShowAdvanced(e)}
						/>
					</div>
					<div className='space-x-2'>
						<Button variant='outline' onClick={() => form.reset()}>
							Cancel
						</Button>
						<Button type='submit'>Submit</Button>
						<Dialog open={open} onOpenChange={setOpen}>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Form Data</DialogTitle>
									<DialogDescription>
										<pre className='text-start flex'>{result}</pre>
									</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					</div>
				</div>
			</form>
		</Form>
	)
}

export default DynamicForm
