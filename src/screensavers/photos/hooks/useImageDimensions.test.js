import { renderHook, act } from '@testing-library/react-hooks'
import useImageDimensions from './useImageDimensions'

jest.setTimeout(30000)

test('should get image dimensions properly', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useImageDimensions('http://localhost:3024/landscape01_4032x3024.png'))

  // act(() => {
  //   result.current.increment()
  // })
  await waitForNextUpdate({ timeout: 30000 })
  await waitForNextUpdate({ timeout: 30000 })
  

  expect(result.current).toMatchInlineSnapshot();
})