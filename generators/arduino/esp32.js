/**
 * Visual Blocks Language
 *
 * Copyright 2020 openblock.cc.
 * https://github.com/openblockcc/openblock-blocks
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

goog.provide('Blockly.Arduino.esp32');

goog.require('Blockly.Arduino');
//机器人config
Blockly.Arduino['arduino_robot_steeringGearConfig'] = function (block) {
    //分别去获取输入的值
    var arg0 = block.getFieldValue('JOINT') || '0';
    var arg1 = Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var arg2 = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    // //添加引用
    // Blockly.Arduino.includes_['esp32SetSCServo'] = '#include <SCServo.h>';
    // Blockly.Arduino.definitions_['esp32SetSCServo'] = 'SMS_STS sms_sts';
    //返回值
    return `sySetServoAngle(${arg0},${arg1},${arg2})\n`
};

//全关节函数
Blockly.Arduino['arduino_robot_setServoPosAll'] = function (block) {
    var arg0 = Blockly.Arduino.valueToCode(block, 'ANGLE1', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var arg1 = Blockly.Arduino.valueToCode(block, 'ANGLE2', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var arg2 = Blockly.Arduino.valueToCode(block, 'ANGLE3', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var arg3 = Blockly.Arduino.valueToCode(block, 'ANGLE4', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var arg4 = Blockly.Arduino.valueToCode(block, 'ANGLE5', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var arg5 = Blockly.Arduino.valueToCode(block, 'ANGLE6', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var arg6 = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    return `sySetServoPosAll(${arg0},${arg1},${arg2},${arg3},${arg4},${arg5},${arg6})\n`;
};

//夹爪函数
Blockly.Arduino['arduino_robot_setGripper'] = function (block) {
    var arg1 = Blockly.Arduino.valueToCode(block, 'ANGLE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var arg2 = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    return `sySetGripperAngle(${arg1},${arg2})\n`
};

//串口
Blockly.Arduino['arduino_serial_esp32SerialBegin'] = function (block) {
    var arg0 = block.getFieldValue('VALUE') || '9600';
    var code = 'Serial.begin(' + arg0 + ');\nsms_sts.pSerial = &Serial2;// sts舵机\n';
    return code;
};

//新增舵头移动函数
Blockly.Arduino['arduino_pin_esp32SetSCServo'] = function (block) {
    //分别去获取输入的值
    var arg0 = Blockly.Arduino.valueToCode(block, 'STEERINGID', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var arg1 = Blockly.Arduino.valueToCode(block, 'POSITION', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var arg2 = Blockly.Arduino.valueToCode(block, 'SPEED', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    //添加引用
    Blockly.Arduino.includes_['esp32SetSCServo'] = '#include <SCServo.h>';
    Blockly.Arduino.definitions_['esp32SetSCServo'] = 'SMS_STS sms_sts';
    //返回值
    return `sms_sts.RegWritePosEx(${arg0},${arg1},${arg2},50);\nsms_sts.RegWriteAction();\n`
};

Blockly.Arduino['arduino_pin_esp32SetPwmOutput'] = function (block) {
    var arg0 = block.getFieldValue('PIN') || '0';
    var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var arg2 = block.getFieldValue('CH') || '0';

    Blockly.Arduino.setups_['esp32SetPwmOutput' + arg0] = 'ledcSetup(' + arg2 + ', 490, 8);';
    Blockly.Arduino.setups_['esp32SetPwmOutput2' + arg0] = 'ledcAttachPin(' + arg0 + ', ' + arg2 + ');';

    var code = "ledcWrite(" + arg2 + ", " + arg1 + ");\n";
    return code;
};

Blockly.Arduino['arduino_pin_esp32SetDACOutput'] = function (block) {
    var arg0 = block.getFieldValue('PIN') || '0';
    var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var code = "dacWrite(" + arg0 + ", " + arg1 + ");\n";
    return code;
};


Blockly.Arduino['arduino_pin_esp32ReadTouchPin'] = function (block) {
    var arg0 = block.getFieldValue('PIN') || '0';
    var code = "touchRead(" + arg0 + ")";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['arduino_pin_esp32SetServoOutput'] = function (block) {
    var arg0 = block.getFieldValue('PIN') || '0';
    var arg1 = Blockly.Arduino.valueToCode(block, 'OUT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || 0;
    var arg2 = block.getFieldValue('CH') || '0';

    Blockly.Arduino.includes_['esp32SetServoOutput'] = '#include <Servo.h>';
    Blockly.Arduino.definitions_['esp32SetServoOutput' + arg0] = 'Servo servo_' + arg0 + ';';
    Blockly.Arduino.setups_['esp32SetServoOutput' + arg0] = 'servo_' + arg0 + '.attach' + '(' + arg0 + ', ' + arg2 + ');';

    var code = 'servo_' + arg0 + '.write' + '(' + arg1 + ');\n';
    return code;
};

Blockly.Arduino['arduino_pin_esp32AttachInterrupt'] = function (block) {
    var arg0 = block.getFieldValue('PIN') || '0';
    var arg1 = block.getFieldValue('MODE') || 'RISING';

    var branch = Blockly.Arduino.statementToCode(block, 'SUBSTACK');
    branch = Blockly.Arduino.addLoopTrap(branch, block.id);

    Blockly.Arduino.definitions_['definitions_ISR_' + arg1 + arg0] =
        'void IRAM_ATTR ISR_' + arg1 + '_' + arg0 + '() {\n' + branch + '}';

    var code = 'attachInterrupt(' + arg0 + ', ISR_' + arg1 + '_' + arg0 + ', ' + arg1 + ');\n';
    return code;
};

Blockly.Arduino['arduino_pin_esp32DetachInterrupt'] = function (block) {
    var arg0 = block.getFieldValue('PIN') || '0';

    var code = 'detachInterrupt(' + arg0 + ');\n';
    return code;
};
