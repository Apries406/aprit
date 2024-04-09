class Aprit {
	constructor(name) {
		this.lastCommitId = -1 // * 创建一个计数器来跟踪commit id

		// * 实际是一个40位的16进制字符串，称为'SHA-1 id'
		this.name = name // * 仓库名
		this.HEAD = null // * 指向最后一次提交的commit对象
	}

	// * 在Aprit类上添加commit方法
	commit(message) {
		const commit = new Commit(
			(++this.lastCommitId).toString(),
			message,
			this.HEAD
		)
		this.HEAD = commit // * 指向最新提交的commit对象(尾巴)
		return commit
	}

	// * 在Aprit类上添加log方法
	log() {
		const history = [] // * 存储commit历史记录
		let commit = this.HEAD // * 从HEAD开始遍历commit链表
		while (commit) {
			history.push(commit)

			commit = commit.parent // * 向上遍历commit链表
		}

		return history
	}
}

const repo = new Aprit('aprit')

class Commit {
	constructor(id, message, parent) {
		this.id = id
		this.message = message
		this.parent = parent // * 指向父commit对象 「commit链表」
	}
}

repo.commit('first commit')
