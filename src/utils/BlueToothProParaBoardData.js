import * as constant from '../Constant'
const TEMP_MAX = 500;
const TEMP_MIN = 0;
const SPO2_WAVE_MAX = 255;
const SPO2_WAVE_MIN = 0;
const ECG_HR_MAX = 350;
const ECG_HR_MIN = 0;
export class BlueToothProParaBoardData {

  // /**
  //  * 体温参数 两个通道的体温值和导联状态
  //  */
  // private float temp1;
  // private float temp2;
  // private boolean temp1Lead;
  // private boolean temp2Lead;

  // /**
  //  * 血压参数 袖带压、收缩压、舒张压、平均圧和脉率
  //  */
  // private int mNbpCufPressure;
  // private int mSysPressure;
  // private int mDisPressure;
  // private int mAvePressure;
  // private int mNbpPulseRate;

  // /**
  //  * 血压测量结束标志位
  //  */
  // private boolean nbpEnd;
  // /**
  //  * 呼吸参数 呼吸率和呼吸波形
  //  */
  // private int mRespRate;
  // private final LinkedList<Integer> respWaveBuf = new LinkedList<>();
  // /**
  //  * 血氧参数 波形、脉率、血氧饱和度和导联状态
  //  */
  // private final LinkedList<Integer> spo2WaveBuf = new LinkedList<>();
  // private int mPulseRate;
  // private int mSpo2Data;
  // private boolean mSpo2FingerLead;
  // private static final int SPO2_WAVE_MAX = 255;
  // private static final int SPO2_WAVE_MIN = 0;

  // /**
  //  * 心电参数 心电1波形、心电2波形、心率、导联信息
  //  */
  // private final LinkedList<Integer> ecg1WaveBuf = new LinkedList<>();
  // private final LinkedList<Integer> ecg2WaveBuf = new LinkedList<>();

  // private int mEcgHr;
  // private boolean mLlLead;
  // private boolean mLaLead;
  // private boolean mRaLead;
  // private boolean mVLead;
  // private static final int ECG_HR_MAX = 350;
  // private static final int ECG_HR_MIN = 0;

  /**
   * @method 类的构造函数，初始化该模块
   */
  constructor() {
      //体温参数初始化
      this.temp1 = 0;
      this.temp2 = 0;
      this.temp1Lead = false;
      this.temp2Lead = false;

      //血压参数初始化
      this.mNbpCufPressure = 0;
      this.mSysPressure = 0;
      this.mDisPressure = 0;
      this.mAvePressure = 0;
      this.mNbpPulseRate = 0;
      this.nbpEnd = false;
      //呼吸参数初始化
      this.mRespRate = 0;
      //血氧参数初始化
      this.mSpo2FingerLead = false;
      this.mPulseRate = 0;
      this.mSpo2Data = 0;
      //心电参数初始化
      this.mEcgHr = 0;
      this.mLlLead = false;
      this.mLaLead = false;
      this.mRaLead = false;
      this.mVLead = false;

      this.ecg1WaveBuf = [];
      this.ecg2WaveBuf = [];
      this.spo2WaveBuf = [];
      this.respWaveBuf = [];

      this.proDataOK = false;
  }

  getProDataOK(){
    //console.log('调用了',this.proDataOK)
      if(this.proDataOK){
        this.proDataOK  = false;
        //console.log('调用了ture')
        return true;
      }
      //console.log('调用了false')
    return false;
  }
  /**
   * @method 获取体温通道1导联信息
   * @return temp1Lead 体温通道1导联信息
   */
  getTemp1Lead() {
      return (this.temp1Lead);
  }

  /**
   * @method 获取体温通道2导联信息
   * @return temp2Lead 体温通道2导联信息
   */
  getTemp2Lead() {
      return (this.temp2Lead);
  }

  /**
   * @method 获取体温通道1体温值
   * @return temp1 体温通道1体温值
   */
  getTemp1() {
      return (this.temp1);
  }

  /**
   * @method 获取体温通道2体温值
   * @return temp2 体温通道2体温值
   */
  getTemp2() {
      return (this.temp2);
  }
  /**
   * @method 获取袖带压值
   * @return 袖带压
   */
  getNbpCufPre() {
      return (this.mNbpCufPressure);
  }

  /**
   * @method 获取收缩压值
   * @return 收缩压
   */
  getSysPressure() {
      return (this.mSysPressure);
  }

  /**
   * @method 获取舒张压值
   * @return 舒张压
   */
  getDisPressure() {
      return (this.mDisPressure);
  }

  /**
   * @method 获取平均压值
   * @return 平均圧
   */
  getAvePressure() {
      return (this.mAvePressure);
  }

  /**
   * @method 获取脉率
   * @return 脉率
   */
  getNbpPulseRate() {
      return (this.mNbpPulseRate);
  }

  /**
   * @method 获取血压测量结束标志位
   * @return 血压测量结束标志位
   */
  isNbpEnd() {
      return this.nbpEnd;
  }

  /**
   * @method 设置血压测量标志位
   * @param isNbpEnd 结束测量标志位
   */
  setIsNbpEnd(isNbpEnd) {
      this.nbpEnd = isNbpEnd;
  }
  /**
   * @method 获取呼吸率
   * @return 呼吸率
   */
  getRespRate() {
      return (this.mRespRate);
  }

  /**
   * @method 获得呼吸波形缓存区大小
   * @return 呼吸波形缓存区大小
   */
  getRespWaveBufSize() {
      return this.respWaveBuf.length;
  }

  /**
   * @method 获取呼吸波形
   * @return 呼吸波形数据
   */
  getRespWave() {
      //synchronized (respWaveBuf) {
  //        if (!this.respWaveBuf.length ===0) {
              //return (this.respWaveBuf.shift());
              return (this.respWaveBuf.splice(0));
        //   } else {
        //       return [];
        //   }
      //}
  }

  /**
   * @method 获取血氧手指导联状态
   * @return 血氧手指导联状态
   */
  getSpo2FingerLead() {
      return (this.mSpo2FingerLead);
  }

  /**
   * @method 获取脉率
   * @return 脉率
   */
  getPulseRate() {
      return (this.mPulseRate);
  }

  /**
   * @method 获得血氧饱和度
   * @return 血氧饱和度
   */
  getSpo2Data() {
      return (this.mSpo2Data);
  }

  /**
   * @method 获取血氧波形
   * @return 血氧波形数据
   */
  getSpo2WaveData() {
      //synchronized (spo2WaveBuf) {
          if (!(this.spo2WaveBuf.length===0)) {
            return (this.spo2WaveBuf.splice(0));
              //return (this.spo2WaveBuf.shift());
          } else {
              return [];
          }
      //}
  }

  /**
   * @method 获得血氧波形缓存区大小
   * @return 血氧波形缓存区大小
   */
  getSpo2WaveBufSize() {
      return this.spo2WaveBuf.length;
  }

  /**
   * @method 获取心电1波形数据数量
   * @return 心电1波形数据数量
   */
  getEcg1WaveBufSize() {
      return this.ecg1WaveBuf.length;
  }

  /**
   * @method 获取心电2波形数据数量
   * @return 心电2波形数据数量
   */
  getEcg2WaveBufSize() {
      return this.ecg2WaveBuf.length;
  }

  /**
   * @method 获取心电1波形
   * @return 心电1波形
   */
  getEcg1WaveData() {
      //synchronized (ecg1WaveBuf) {
          if (!(this.ecg1WaveBuf.length===0)) {
              //return (this.ecg1WaveBuf.shift());
              return (this.ecg1WaveBuf.splice(0));
          } else {
              return [];
          }
      //}
  }

  /**
   * @method 获取心电2波形
   * @return 心电2波形
   */
  getEcg2WaveData() {
      //synchronized (ecg2WaveBuf) {
          if (!(this.ecg2WaveBuf.length === 0)) {
              //return (this.ecg2WaveBuf.shift());
              return (this.ecg2WaveBuf.splice(0));
          } else {
              return [];
          }
      //}
  }

  /**
   * @method 获取心率
   * @return 心率
   */
  getEcgHr() {
      return (this.mEcgHr);
  }

  /**
   * @method 获取心电导联L状态
   * @return 心电导联L状态
   */
  getEcgLlLead() {
      return (this.mLlLead);
  }

  /**
   * @method 获取心电导联LA状态
   * @return 心电导联LA状态
   */
  getEcgLaLead() {
      return (this.mLaLead);
  }

  /**
   * @method 获取心电导联RA状态
   * @return 心电导联RA状态
   */
  getEcgRaLead() {
      return (this.mRaLead);
  }

  /**
   * @method 获取心电导联V状态
   * @return 心电导联V状态
   */
  getEcgVLead() {
      return (this.mVLead);
  }

  /**
   * @method 获取心电导联状态
   * @return 心电导联状态
   */
  getEcgLead() {
      return this.mLlLead && this.mLaLead && this.mRaLead && this.mVLead;
  }

  /**
   * @method 清除呼吸波形数据
   */
  clearRespWaveBuf(){
      if(!this.respWaveBuf.length === 0){
        this.respWaveBuf.splice(0,this.respWaveBuf.length);
      }
  }

  /**
   * @method 清除血氧波形数据
   */
  clearSpo2WaveBuf(){
      if(!this.spo2WaveBuf.length===0){
        this.spo2WaveBuf.splice(0,this.spo2WaveBuf.length);
      }
  }

  /**
   * @method 清除心电1波形数据
   */
  clearEcg1WaveBuf(){
      if(!this.ecg1WaveBuf.length===0){
        this.ecg1WaveBuf.splice(0,this.ecg1WaveBuf.length);
      }
  }

  /**
   * @method 清除心电2波形数据
   */
  clearEcg2WaveBuf(){
      if(!this.ecg2WaveBuf.length === 0){
        this.ecg2WaveBuf.splice(0,this.ecg2WaveBuf.length);
      }
  }

  /**
   * @method 清除所有波形数据
   */
  clearAllWaveBuffer(){
      clearRespWaveBuf();
      clearSpo2WaveBuf();
      clearEcg1WaveBuf();
      clearEcg2WaveBuf();
  }

  /**
   * @method 体温数据处理
   * @param unpacked 已解包的体温数据包
   */
  proTempPara(unpacked) {
      let data;
      data = unpacked[2];
      //判断导联状态，tempLead为bool类型
      this.temp1Lead = (data & 0x01) != 1;
      this.temp2Lead = ((data >> 1) & 0x01) != 1;

      //把数据包第四位的值清零（左移8位），并将第五位值赋值给第四位（|按位或运算）
      data = (unpacked[3] << 8) | unpacked[4];
      //体温1值为data的小数点左移一位形式（转换为float类型）
      this.temp1 = (data / 10.0);
      //判断体温最大最小值
      if (this.temp1 < TEMP_MIN) {
        this.temp1 = TEMP_MIN;
      }
      if (this.temp1 > TEMP_MAX) {
        this.temp1 = TEMP_MAX;
      }

      //把数据包第六位的值清零（左移8位），并将第七位值赋值给第六位（|按位或运算）
      data = (unpacked[5] << 8) | unpacked[6];
      this.temp2 = (data / 10.0);

      if (this.temp2 < TEMP_MIN) {
        this.temp2 = TEMP_MIN;
      }
      if (this.temp2 > TEMP_MAX) {
        this.temp2 = TEMP_MAX;
      }
  }

  /**
   * @method 根据体温二级id处理体温数据
   * @param unpacked 已解包的体温数据包
   */
  proTempData(unpacked) {
      if (constant.DAT_TEMP_DATA == unpacked[1]) {
        this.proTempPara(unpacked);
      }
  }
  /**
   * @method 处理袖带圧数据包
   * @param unpacked 已解包的袖带压数据包
   */
  proNbpCufPre(unpacked) {
    this.mNbpCufPressure = (unpacked[2] << 8) | unpacked[3];
  }

  /**
   * @method 处理血压测量结束标志位
   * @param unpacked 血压测量结束包
   */
  proNbpEnd(unpacked) {
      let data;
      data = unpacked[3];

      if (data != 0) {
        this.nbpEnd = true;
      }
  }

  /**
   * @method 处理无创血压测量结果1包
   * @param unpacked 无创血压测量结果1包
   */
  proNbpResult1(unpacked) {
    this.mSysPressure = (unpacked[2] << 8) | unpacked[3];
    this.mDisPressure = (unpacked[4] << 8) | unpacked[5];
    this.mAvePressure = (unpacked[6] << 8) | unpacked[7];
  }

  /**
   * @method 处理无创血压测量结果2包
   * @param unpacked 无创血压测量结果2包
   */
  proNbpResult2(unpacked) {
    this.mNbpPulseRate = (unpacked[2] << 8) | unpacked[3];
    this.nbpEnd = true;
  }

  /**
   * @method 根据血压二级id处理血压数据
   * @param unpacked 已解包的血压数据包
   */
  proNbpData(unpacked) {
      switch (unpacked[1]) {
          case constant.DAT_NIBP_CUFPRE:
              this.proNbpCufPre(unpacked);
              break;
          case constant.DAT_NIBP_END:
            this.proNbpEnd(unpacked);
              break;
          case constant.DAT_NIBP_RSLT1:
            this.proNbpResult1(unpacked);
              break;
          case constant.DAT_NIBP_RSLT2:
            this.proNbpResult2(unpacked);
              break;
          default:
              break;
      }
  }
  /**
   * @method 处理呼吸波形包
   * @param unpacked 呼吸波形包
   */
  proRespWave(unpacked) {
      let i;
      let respData;

      for (i = 0; i < 5; i++) {
          //呼吸波形
          respData = unpacked[i + 2];
          //synchronized (respWaveBuf) {
            //   console.log('处理呼吸波形包',this.respWaveBuf)
              this.respWaveBuf.push(respData);
          //}
      }
  }

  /**
   * @method 处理呼吸率包
   * @param unpacked 呼吸率包
   */
  proRespRate(unpacked) {
    this.mRespRate = (unpacked[2] << 8) | unpacked[3];
  }

  /**
   * @method 根据2级id处理呼吸数据
   * @param unpacked 呼吸数据包
   */
  proRespData(unpacked) {
      switch (unpacked[1]) {
          case constant.DAT_RESP_WAVE:
              //console.log('根据2级id处理呼吸数据')
            this.proRespWave(unpacked);
              break;
          case constant.DAT_RESP_RR:
            this.proRespRate(unpacked);
              break;
          default:
              break;
      }
  }

  /**
   * @method 解包后的血氧波形数据处理
   * @param unpacked 血氧波形数据包
   */
  proSpo2Wave(unpacked) {
      let data;

      for (let i = 0; i < 5;  i++) {
          data = unpacked[i + 2];

          if (data < SPO2_WAVE_MIN) {
              data = SPO2_WAVE_MIN;
          }
          if (data > SPO2_WAVE_MAX) {
              data = SPO2_WAVE_MAX;
          }
          data = data << 1;
          //synchronized (spo2WaveBuf) {
            this.spo2WaveBuf.push(data);
          //}
      }
      data = unpacked[7];

      this.mSpo2FingerLead = ((data >> 7) & 0x01) != 1;
  }

  /**
   * @method 解包后的脉率和血氧饱和度数据处理
   * @param unpacked 血氧数据包
   */
  proSpo2PR(unpacked) {
      let data;

      data = (unpacked[3] << 8) | unpacked[4];
      this.mPulseRate = data;

      data = unpacked[5];
      this.mSpo2Data = data;
  }

  /**
   * @method 根据2级id处理血氧数据
   * @param unpacked 血氧数据包
   */
  proSpo2Data(unpacked) {
      switch (unpacked[1]) {
          case constant.DAT_SPO2_WAVE:
              this.proSpo2Wave(unpacked);
              break;
          case constant.DAT_SPO2_DATA:
            this.proSpo2PR(unpacked);
              break;
          default:
              break;
      }
  }
  /**
   * @method 解包后心电波形信息处理
   * @param unpacked 心电波形信息包
   */
  proEcgWave(unpacked) {
      let ecg1data,ecg2data;

      ecg1data = unpacked[2] << 8 | unpacked[3];
      ecg1data = ecg1data - 2048;
      ecg1data = ecg1data >> 3;

      ecg2data = unpacked[4] << 8 | unpacked[5];
      ecg2data = ecg2data - 2048;
      ecg2data = ecg2data >> 3;

      //synchronized (ecg1WaveBuf) {
        this.ecg1WaveBuf.push(ecg1data);
      //}

      //synchronized (ecg2WaveBuf){
        this.ecg2WaveBuf.push(ecg2data);
      //}
  }

  /**
   * @method 解包后心电导联信息处理
   * @param unpacked 心电导联信息包
   */
  proEcgLead(unpacked) {

    this.mLlLead = (unpacked[2] & 0x01) != 1;
    this.mLaLead = ((unpacked[2] >> 1) & 0x01) != 1;
    this.mRaLead = ((unpacked[2] >> 2) & 0x01) != 1;
    this.mVLead = ((unpacked[2] >> 3) & 0x01) != 1;
  }

  /**
   * @method 解包后心率数据处理
   * @param unpacked 心率包
   */
  proEcgHR(unpacked) {
      let data;

      data = unpacked[2] << 8 | unpacked[3];

      if (data < ECG_HR_MIN) {
          data = ECG_HR_MIN;
      }
      if (data > ECG_HR_MAX) {
          data = ECG_HR_MAX;
      }

      this.mEcgHr = data;
  }

  /**
   * @method 根据2级id处理心电数据
   * @param unpacked 心电数据包
   */
  proEcgData(unpacked)
  {
      switch (unpacked[1])
      {
          case constant.DAT_ECG_WAVE:
              this.proEcgWave(unpacked);
              break;
          case constant.DAT_ECG_LEAD:
            this.proEcgLead(unpacked);
              break;
          case constant.DAT_ECG_HR:
            this.proEcgHR(unpacked);
              break;
          default:
              break;
      }
  }

  /**
   * @method 根据模块id分别处理数据包
   * @param unpacked 已解包的数据包
   */
  proData(unpacked,type) {
      let recPacketId = unpacked[0];
      switch(type){
        case constant.TYPE_TEMP:
          if(recPacketId===constant.MODULE_TEMP){
            this.proTempData(unpacked);
            this.proDataOK = true;
          }
          break;
        case constant.TYPE_ECG:
          if(recPacketId===constant.MODULE_ECG){
            this.proEcgData(unpacked);
            this.proDataOK = true;
          }
          break;
        case constant.TYPE_NBP:
          if(recPacketId===constant.MODULE_NBP){
            this.proNbpData(unpacked);
            this.proDataOK = true;
          }
          break;
        case constant.TYPE_RESP:
          if(recPacketId===constant.MODULE_RESP){
            this.proRespData(unpacked);
            this.proDataOK = true;
          }
          break;
        case constant.TYPE_SPO2:
          if(recPacketId===constant.MODULE_SPO2){
            this.proSpo2Data(unpacked);
            this.proDataOK = true;
          }
          break;
      }
  }

}