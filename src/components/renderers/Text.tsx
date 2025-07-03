interface TextProps {
  text: string
  onChange: (value: string) => void
}

const Text: React.FC<TextProps> = ({ text, onChange }) => {
  return (
    <div className='text-lg flex h-full w-full items-center justify-center  font-semibold bg-white px-5 shadow-md'>
      {/* <textarea
        className='h-full w-full rounded-lg border p-2'
        value={text}
        onChange={(e) => onChange(e.target.value)}
      /> */}
      {text}
    </div>
  )
}

export default Text
