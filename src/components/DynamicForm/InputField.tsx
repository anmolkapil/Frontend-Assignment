import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'

import { removeUnderscores } from '@/utils/utils'
import { clsx } from 'clsx'

const InputField = ({ fieldConfig, form, parent }) => (
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
			pattern: fieldConfig.validate?.pattern,
		}}
		render={({ field }) => (
			<FormItem
				className={clsx('grid grid-cols-2 items-center', {
					hidden: fieldConfig.disable,
				})}
			>
				<FormLabel>
					{removeUnderscores(fieldConfig.label)}
					{fieldConfig.validate.required && (
						<span className='text-red-400'> *</span>
					)}
				</FormLabel>
				<FormControl>
					<Input
						className='bg-sky-100 border-blue-200 focus-visible:ring-indigo-200'
						placeholder={fieldConfig.placeholder}
						disabled={fieldConfig.disable}
						{...field}
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
)

export default InputField
