const validMobile = (rule: any, value: any, callback: any) => {
  if (value === '' || value === undefined) {
    callback()
  } else {
    const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    if (!reg.test(value)) { callback(new Error('手机号码格式不对')) } else {
      callback()
    }
  }
}
const validUserName = (rule: any, value: any, callback: any) => {
  const reg = /^[a-zA-Z][a-zA-Z0-9_]{5,21}$/
  if (!reg.test(value)) { callback(new Error('用户名只允许字母、数字、下划线组成，首位只能为字母（6-20字符，区分大小写）')) } else {
    callback()
  }
}
const validMoney = (rule: any, value: any, callback: any) => {
  const reg = /^[0-9]+(.[0-9]{1,2})?$/
  if (!reg.test(value)) { callback(new Error('请输入合适的价格,例如88.88')) } else {
    callback()
  }
}

const validNumber = (rule: any, value: any, callback: any) => {
  const reg = /^[0-9]*$/
  if (!value) {
    callback()
  } else {
    if (!reg.test(value)) { callback(new Error('只允许输入数字')) } else {
      callback()
    }
  }
}

const validNumberUP = (rule: any, value: any, callback: any) => {
  const reg = /^\d+(\.\d+)?$/
  if (!reg.test(value)) { callback(new Error('请输入合适数字')) } else {
    callback()
  }
}

const validateObj: any = {
  name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  organization: [{ required: true, message: '请输入机构名称', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入简介', trigger: 'blur' }],
  photo: [{ required: true, message: '请选择图片', trigger: 'change' }],
  content: [{ required: true, message: '请输入简介', trigger: 'change' }],
  fileList: [{ required: true, message: '请选择图片', trigger: 'change' }],
  status: [{ type: 'boolean', required: true, message: '请选择状态', trigger: 'change' }],
  sort: [{ type: 'number', required: true, message: '请输入数字', trigger: 'change' }],
  column: [],
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  appname: [{ required: true, message: '请输入公众号名称', trigger: 'blur' }],
  appid: [{ required: true, message: '请输入appid', trigger: 'blur' }],
  appsecret: [{ required: true, message: '请输入appsecret', trigger: 'blur' }],
  roleStatus: [{ required: true, message: '请选择角色状态', trigger: 'change' }],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { validator: validUserName, trigger: 'blur' }],
  role: [{ required: true, message: '请选择用户角色', trigger: 'change' }],
  password: [{ required: true, message: '请输入密码', trigger: 'change' }, { min: 6, message: '密码最少六位数', trigger: 'blur' }],
  phone: [{ validator: validMobile, trigger: 'blur' }],
  activityName: [{ required: true, message: '请输入活动标题', trigger: 'blur' }],
  stateName: [{ required: true, message: '请选择活动状态', trigger: 'change' }],
  activityCost: [{ required: true, message: '请填写活动费用', trigger: 'blur' }],
  activityNumber: [{ required: true, message: '请填写活动名额', trigger: 'blur' }],
  courseName: [{ required: true, message: '请填写名称', trigger: 'blur' }],
  jumpModelName: [{ required: true, message: '请选择跳转模块', trigger: 'change' }],
  imageUrl: [{ required: true, message: '请上传图片', trigger: 'change' }],
  names: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  primaryPrice: [{ required: true, message: '请输入原价', trigger: 'blur' }, { validator: validMoney, trigger: 'blur' }],
  discountPrice: [{ required: true, message: '请输入优惠价', trigger: 'blur' }, { validator: validMoney, trigger: 'blur' }],
  curriculumType: [{ required: true, message: '请选择课程分类', trigger: 'change' }],
  serialNumber: [{ validator: validNumber, trigger: 'blur' }]
}

export function rulesObj(arr: any) {
  const obj: any = {}
  for (const item of arr) {
    obj[item] = validateObj[item]
  }
  return obj
}

export const vaildateTeamEdit: any = {
  uname: [{ required: true, message: '请输入合伙人姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: validMobile, trigger: 'blur' }],
  "partner_type": [{ required: true, message: '请选择课程分类', trigger: 'change' }],
}

export const vaildateBase: any = {
  typeNames: [{ required: true, message: '课程分类名称', trigger: 'blur' }],
  serialNumber: [{ validator: validNumber, trigger: 'blur' }],
  names: [{ required: true, message: '请输入名称', trigger: 'blur' }],
  price: [{ required: true, message: '请输入原价', trigger: 'blur' }, { validator: validMoney, trigger: 'blur' }],
  classHour: [{ required: true, message: '请输入课时数', trigger: 'blur' }, { validator: validNumberUP, trigger: 'blur' }],
  effectiveDay: [{ required: true, message: '请输入有效天数', trigger: 'blur' }, { validator: validNumberUP, trigger: 'blur' }],
  loginName: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: validMobile, trigger: 'blur' }],
  teacherName: [{ required: true, message: '请输入教师名称', trigger: 'blur' }],
  orgId: [{ required: true, message: '请选择机构', trigger: 'change' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }],
  linkModular: [{ required: true, message: '请选择模块名称', trigger: 'change' }],
  modularId: [{ required: true, message: '请选择模块数据', trigger: 'change' }]
}

export function baseRulesObj(arr: any) {
  const obj: any = {}
  for (const item of arr) {
    obj[item] = vaildateBase[item]
  }
  return obj
}
