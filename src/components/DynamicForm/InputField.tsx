import {
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'

import FieldLabel from './FieldLabel'

import { Input } from '@/components/ui/input'

import { clsx } from 'clsx'

import type { FormFieldProps } from '@/types/types'

const InputField: React.FC<FormFieldProps> = ({
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
		defaultValue={fieldConfig.validate?.defaultValue || ''}
		shouldUnregister={!fieldConfig.disable}
		rules={{
			required: fieldConfig.validate?.required,
			...(fieldConfig.validate?.pattern && {
				pattern: RegExp(fieldConfig.validate?.pattern),
			}),
		}}
		render={({ field }) => (
			<FormItem
				className={clsx('grid grid-cols-2 items-center', {
					hidden: fieldConfig.disable,
				})}
			>
				<FieldLabel fieldConfig={fieldConfig} />
				<FormControl>
					<Input
						className='bg-sky-100 border-blue-200 focus-visible:ring-indigo-200'
						placeholder={fieldConfig.placeholder}
						disabled={fieldConfig.validate?.immutable}
						{...field}
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
)

export default InputField
