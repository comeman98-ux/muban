import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("请在命令后面输入要加密的密码，例如：");
  console.error("  node scripts/hash-password.mjs 你的密码");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 10);
console.log("原始密码:", password);
console.log("加密后的密码哈希，请复制这一整行：");
console.log(hash);

