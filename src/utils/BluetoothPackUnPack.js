/**
 * 模块ID，分别是系统信息、心电、呼吸、体温、血氧和无创血压。
 */
const MODULE_SYS = 0x01;
const MODULE_ECG = 0x10;
const MODULE_RESP = 0x11;
const MODULE_TEMP = 0x12;
const MODULE_SPO2 = 0x13;
const MODULE_NBP = 0x14;

/**
 * 体温数据 2级id
 */
const DAT_TEMP_DATA = 0x02;

/**
 * 血压数据 2级id
 */
const DAT_NIBP_CUFPRE = 0x02;
const DAT_NIBP_END = 0x03;
const DAT_NIBP_RSLT1 = 0x04;
const DAT_NIBP_RSLT2 = 0x05;

/**
 * 呼吸数据 2级id
 */
const DAT_RESP_WAVE = 0x02;
const DAT_RESP_RR = 0x03;

/**
 * 血氧数据 2级id
 */
const DAT_SPO2_WAVE = 0x02;
const DAT_SPO2_DATA = 0x03;

/**
 * 心电数据 2级id 心电波形、导联信息、心率
 */
const DAT_ECG_WAVE = 0x02;
const DAT_ECG_LEAD = 0x03;
const DAT_ECG_HR = 0x04;

/**
 * IAP命令id
 */
const EnumIAPCmd_RUN_IAP = 0x01; //跳转置IAP
const EnumIAPCmd_UPDATE = 0x02; //更新程序
const EnumIAPCmd_IAP_MENU = 0x03; //进入IAP菜单
const EnumIAPCmd_RUN_APP = 0x04; //跳转至APP
const EnumIAPCmd_ERASE = 0x05; //擦除False
const EnumIAPCmd_UPLOAD = 0x06; //上传Flash程序至上位机
const CMD_SYS_UPDATE = 0x10; //系统更新App

const MAX_PACK_ID = 0x80;
const MAX_PACK_LEN = 10;
const PACK_HEAD_CHECKSUM = 2;
const TAG = 'PackUnPack';
export class BluetoothPackUnPack {
  /**
   * mPackBuf[0]:   packFirstId
   * mPackBuf[1]:   packHead
   * mPackBuf[2]:   packSecondId
   * mPackBuf[3-8]: packData
   * mPackBuf[9] :  checkSum
   */

  /**
   * @method 类的构造函数，初始化该模块
   */
  constructor() {
    this.mPackBuf = [];
    //ID、数据头、数据及校验和均清零
    for (let i = 0; i < MAX_PACK_LEN; i++) {
      this.mPackBuf[i] = 0;
    }
    //数据包的长度默认为0，获取到数据包ID标志默认为false，剩余的字节数默认为0
    this.sPackLen = 0;
    this.sGotPackId = false;
    this.sRestByte = 0;
  }

  /**
   * @method 获取解包结果
   * @return  mTempBuf: 解包后的数据包
   */
  getUnPackResult = () => {
    return this.mPackBuf;
  }

  /**
   * @method 对数据进行打包
   * @param packet 待打包的数据包
   */
  packData = (packet) => {
    //包ID必须在0x00-0x7F之间, pPT[0]为包ID
    if (packet[0] < MAX_PACK_ID) {
      if (packet.length == MAX_PACK_LEN) {
        return this.packWithCheckSum(packet, MAX_PACK_LEN);
      }
    }
  }

  /**
   * @method 对数据进行解包
   * @param data 接收的数据
   * @return findPack true - 解包成功
   */
  unPackData = (data) => {
    let findPack = false;

    //已经接收到包ID
    if (this.sGotPackId) {
      //包数据（非包ID）必须大于或等于0X80
      if (MAX_PACK_ID <= data) {
        //数据包中的数据从第二个字节开始存储，因为第一个字节是包ID
        this.mPackBuf[this.sPackLen] = data;
        this.sPackLen++; //包长自增
        sRestByte--; //剩余字节数自减

        //已经接收到完整的数据包
        if (0 >= sRestByte && MAX_PACK_LEN == this.sPackLen) {
          //接收到完整数据包后尝试解包
          findPack = this.unpackWithCheckSum(this.mPackBuf, this.sPackLen);
          //清除获取到包ID标志，即重新判断下一个数据包
          this.sGotPackId = false;
        }
      } else {
        this.sGotPackId = false;
      } //当前的数据为包ID
    } else if (data < MAX_PACK_ID) {
      //包长（打包后的包长）要严格大于0
      //剩余的包长，即打包好的包长减去1
      //尚未接收到包ID即表示包长为1
      sRestByte = 9;
      this.sPackLen = 1;
      //数据包的ID
      this.mPackBuf[0] = data;
      //表示已经接收到包ID
      this.sGotPackId = true;
    }
    //如果获取到完整的数据包，并解包成功，findPack为TRUE，否则为FALSE
    return findPack;
  }

  /**
   * @method 带校验和的数据打包
   * @param packet 待打包的数据包
   * @param len     数据包长度
   */
  packWithCheckSum = (packet, len) => {
    let dataHead; //数据头，在数据包的第2个位置，即ID之后
    let checkSum; //数据校验和，在数据包的最后一个位置

    //对于包长小于2的数据，不需要打包，因此直接跳出此函数，
    //注意，最短的包只有包头和校验和，即系统复位
    if (len != MAX_PACK_LEN) {
      return;
    }

    //取出ID，加到校验和
    checkSum = packet[0];
    //数据头左移，后面数据的最高位位于dataHead的靠左
    //让数据头等于零
    dataHead = 0;

    for (let i = MAX_PACK_LEN - PACK_HEAD_CHECKSUM; i > 1; i--) {
      //数据头左移，后面数据的最高位位于dataHead的靠左
      dataHead <<= 1;
      //对数据进行最高位置1操作，并将数据右移一位（数据头插入原因）
      packet[i] = packet[i - 1] | 0x80;
      //数据加到校验和
      checkSum += packet[i];
      //取出原始数据的最高位，与dataHead相或
      dataHead |= (packet[i - 1] & 0x80) >> 7;
    }

    //数据头在数据包的第二个位置，仅次于包头，数据头的最高位也要置为1
    packet[1] = dataHead | 0x80;
    //将数据头加到校验和
    checkSum += packet[1];
    //校验和的最高位也要置为1
    packet[9] = (checkSum | 0x80) & 0x0ff;
    return packet;
  }

  /**
   * @method 带校验和的数据解包
   * @param unPacket 待解包的数据包
   * @param len     数据包长度
   * @return  true - 解包成功，false - 解包不成功
   */
  unpackWithCheckSum = (unPacket, len) => {
    let dataHead;
    let checkSum;

    //len小于2，返回0
    if (len != MAX_PACK_LEN) {
      return false;
    }
    //取出ID，加到校验和
    checkSum = unPacket[0];
    //取出数据包的数据头，赋给dataHead
    dataHead = unPacket[1];
    //将数据头加到校验和
    checkSum += dataHead;

    for (let i = 1; i < len - PACK_HEAD_CHECKSUM; i++) {
      //将数据依次加到校验和
      checkSum += unPacket[i + 1];
      //还原有效的8位数据
      unPacket[i] = (unPacket[i + 1] & 0x7f) | ((dataHead & 0x01) << 7);
      //数据头右移一位
      dataHead >>= 1;
    }

    return (checkSum & 0x7f) == (unPacket[MAX_PACK_LEN - 1] & 0x7f);
  }
}
