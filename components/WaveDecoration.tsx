import Image from 'next/image'
import shape1 from '@/public/shapes/shape1.svg'
import shape2 from '@/public/shapes/shape2.svg'
import {cn} from '@/lib/utils'

const WaveDecoration = ({ double=false, className }: { double?: boolean, className?: string }) => {
	return (
		<div className={cn('absolute w-full right-0 left-0 bottom-0 -z-10 overflow-x-hidden h-full', className)}>
			{double && <Image
				src={shape2}
				alt="Arbitrary wave like shape to make the design look more interesting"
				className="min-w-full object-cover h-2/3 absolute bottom-0 opacity-40"
			/>}
			<Image
				src={shape1}
				alt="Arbitrary wave like shape to make the design look more interesting"
				className="min-w-full object-cover h-1/2 absolute bottom-0 opacity-40"
			/>
		</div>
	)
}

export default WaveDecoration
