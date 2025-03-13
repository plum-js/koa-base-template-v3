import * as Router from 'koa-router'
import { create, update, findOne, findMany, del, patch } from './ctrls'

const router: any = new Router({
  prefix: '/v1/students',
})

router.post('/', create)
router.put('/', update)
router.patch('/', patch)
router.get('/:id', findOne)
router.get('/', findMany)
router.delete('/:id', del)

export { router }
