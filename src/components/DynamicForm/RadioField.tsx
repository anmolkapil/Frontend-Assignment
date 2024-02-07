import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

const RadioField = ({ fieldConfig, form, parent }) => {
	return (
		<FormField
			control={form.control}
			name={
				fieldConfig.level > 0
					? `${parent}.${fieldConfig.jsonKey}`
					: fieldConfig.jsonKey
			}
			defaultValue={fieldConfig.validate?.defaultValue}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<Tabs
							className='w-full'
							onValueChange={field.onChange}
							defaultValue={field.value}
							{...field}
						>
							<TabsList className='flex bg-transparent gap-x-2'>
								{fieldConfig.validate.options.map((option) => (
									<TabsTrigger
										className='flex-1 p-2 border bg-sky-100 border-blue-200 data-[state=active]:bg-indigo-100/70 data-[state=active]:border-indigo-200 whitespace-normal'
										key={option.value}
										value={option.value}
									>
										{option.label}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}

export default RadioField
