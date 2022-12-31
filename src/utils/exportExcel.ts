export default function (object: Object[], headers: string[], name: string) {
  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = headers.join(',') + '\n'
  // 增加\t为了不让表格显示科学计数法或者其他格式
  for (let i = 0; i < object.length; i++) {
    for (const key in object[i]) {
      str += `${object[i][key] + '\t'},`
    }
    str += '\n'
  }
  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  // 通过创建a标签实现
  const link = document.createElement("a");
  link.href = uri;
  // 对下载的文件命名
  link.download =  `${name}.csv`;
  link.click();
}
