import type { FC, ReactNode } from 'react'

interface MobileFrameProps {
  children: ReactNode
}

const MobileFrame: FC<MobileFrameProps> = ({ children }) => {
  return (
    <div
      className="relative mx-auto w-full overflow-hidden bg-black"
      style={{
        maxWidth: '430px',
        height: '100dvh',
        maxHeight: '932px',
      }}
    >
      {children}
    </div>
  )
}

export default MobileFrame
