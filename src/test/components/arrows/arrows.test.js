import { assert } from 'chai'
import {
  PrevArrow,
  NextArrow,
} from 'components/arrows'

describe('Test the Arrows utilities', () => {
  it('Arrows', () => {
    assert.isObject(PrevArrow({}), 'PrevArrow')
    assert.isObject(NextArrow({}), 'NextArrow')
  })

})

