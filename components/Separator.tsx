import {cn} from '@/lib/utils'

const Separator = ({ className }: { className?: string }) => {
	return <div className={cn('w-full h-[1px] bg-neutral-50/15', className)} />
}

export default Separator
