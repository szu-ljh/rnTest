//定义一些常量值
/**
 * 用户所选中测量的数据，分别是心电、呼吸、体温、血氧和无创血压。
 */
export const TYPE_ECG = 'ecg';
export const TYPE_RESP = 'resp';
export const TYPE_TEMP = 'temp';
export const TYPE_SPO2 = 'spo2';
export const TYPE_NBP = 'nbp';

/**
 * 模块ID，分别是系统信息、心电、呼吸、体温、血氧和无创血压。
 */
export const MODULE_SYS = 0x01;
export const MODULE_ECG = 0x10;
export const MODULE_RESP = 0x11;
export const MODULE_TEMP = 0x12;
export const MODULE_SPO2 = 0x13;
export const MODULE_NBP = 0x14;

/**
 * 体温数据 2级id
 */
export const DAT_TEMP_DATA = 0x02;

/**
 * 血压数据 2级id
 */
export const DAT_NIBP_CUFPRE = 0x02;
export const DAT_NIBP_END = 0x03;
export const DAT_NIBP_RSLT1 = 0x04;
export const DAT_NIBP_RSLT2 = 0x05;

/**
 * 呼吸数据 2级id
 */
export const DAT_RESP_WAVE = 0x02;
export const DAT_RESP_RR = 0x03;

/**
 * 血氧数据 2级id
 */
export const DAT_SPO2_WAVE = 0x02;
export const DAT_SPO2_DATA = 0x03;

/**
 * 心电数据 2级id 心电波形、导联信息、心率
 */
export const DAT_ECG_WAVE = 0x02;
export const DAT_ECG_LEAD = 0x03;
export const DAT_ECG_HR = 0x04;