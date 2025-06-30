interface ImageProps {
  src: string
}

const Image: React.FC<ImageProps> = ({ src }) => {
  return (
    <div
      className='image-display overflow-hidden rounded-lg bg-white p-2 shadow-md'
      style={{ height: '100%', width: '100%' }}
    >
      <img
        src='https://avatars.githubusercontent.com/u/98962215?v=4'
        alt='Placeholder'
        className='h-full w-full object-cover'
      />
    </div>
  )
}

export default Image
