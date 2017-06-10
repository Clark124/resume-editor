import AV from '../lib/leancloud'
export default function () {
  let current = AV.User.current();
  if (current) {
    let { id, createdAt, attributes: { username } } = current

    return { id, username, createdAt }
  } else {
    return null
  }
}