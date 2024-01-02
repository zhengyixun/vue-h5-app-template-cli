const fs = require('fs');
const path = require('path')


function copyDir(src, dest) {
    // 判断src是否为目录
    if (fs.statSync(src).isDirectory()) {
      // 如果dest不存在，则创建目录
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      // 读取src中的内容
      fs.readdirSync(src).forEach(file => {
        // 递归地拷贝子目录或文件
        copyDir(path.join(src, file), path.join(dest, file));
      });
    } else {
      // 直接拷贝文件到目标目录下
      fs.copyFileSync(src, dest);
    }
}

function resolve(_path, dir=__dirname){
    return path.resolve(dir, _path)
}
function cwd(){
  return process.cwd()
}

module.exports = {
  cwd,
  copyDir,
  resolve
}