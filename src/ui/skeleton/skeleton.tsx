import clsx from 'clsx'
import { CSSProperties } from 'react'
import './styles.scss'

export interface SkeletonProps {
  className?: string
  variant?: 'circular' | 'rectangular' | 'rounded' | 'text'
  animation?: 'pulse' | 'wave' | false
  style?: CSSProperties
  width?: number
  height?: number
}

export default function Skeleton({
  className,
  variant = 'rectangular',
  animation = 'pulse',
  width,
  height,
  style = {}
}: SkeletonProps) {
  return (
    <div
      className={clsx(className, 'skeleton', `skeleton_${variant}`, animation && `skeleton_animation_${animation}`)}
      style={{
        ...style,
        ...(width && { width: width + 'px' }),
        ...(height && { height: height + 'px' })
      }}
    />
  )
}
