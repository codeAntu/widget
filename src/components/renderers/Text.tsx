interface TextProps {
  text: string
  onChange: (value: string) => void
}

const Text: React.FC<TextProps> = ({ text, onChange }) => {
  return (
    <div className='text-editor rounded-lg bg-white p-4 shadow-md'>
      <textarea
        className='h-full w-full rounded-lg border p-2'
        value={text}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default Text
