import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import FieldLabel from './FieldLabel'

import type { FormFieldProps } from '@/types/types'

const SelectField: React.FC<FormFieldProps> = ({
	fieldConfig,
	form,
	parent,
}) => (
	<FormField
		control={form.control}
		name={
			fieldConfig.level > 0
				? `${parent}.${fieldConfig.jsonKey}`
				: fieldConfig.jsonKey
		}
		defaultValue={fieldConfig.validate.defaultValue}
		shouldUnregister={true}
		render={({ field }) => (
			<FormItem className='grid grid-cols-2 items-center'>
				<FieldLabel fieldConfig={fieldConfig} />
				<Select
					onValueChange={field.onChange}
					defaultValue={field.value}
					disabled={fieldConfig.validate?.immutable}
					{...field}
				>
					<FormControl>
						<SelectTrigger className='bg-sky-100 border-blue-200 focus:ring-indigo-200'>
							<SelectValue />
						</SelectTrigger>
					</FormControl>
					<SelectContent>
						{fieldConfig.validate?.options?.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.value}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<FormMessage />
			</FormItem>
		)}
	/>
)

export default SelectField
