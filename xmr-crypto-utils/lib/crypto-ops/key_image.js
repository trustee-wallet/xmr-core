'use strict'

Object.defineProperty(exports, '__esModule', { value: true })
const xmr_vendor_1 = require('../../../xmr-vendor')
const constants_1 = require('./constants')
const xmr_str_utils_1 = require('../../../xmr-str-utils')
const hash_ops_1 = require('./hash_ops')

async function derive_key_image_from_tx(tx_pub, view_sec, spend_pub, spend_sec, output_index, hwdev) {
    if (!tx_pub || tx_pub.length !== 64) {
        throw Error('Invalid tx_pub length')
    }
    if (!view_sec || view_sec.length !== 64) {
        throw Error('Invalid view_sec length')
    }
    if (!spend_pub || spend_pub.length !== 64) {
        throw Error('Invalid spend_pub length')
    }
    if (!spend_sec || spend_sec.length !== 64) {
        throw Error('Invalid spend_sec length')
    }
    const recv_derivation = await hwdev.generate_key_derivation(tx_pub, view_sec)
    const ephemeral_sec = await hwdev.derive_secret_key(recv_derivation, output_index, spend_sec)
    const ephemeral_pub = await hwdev.secret_key_to_public_key(ephemeral_sec)
    const key_image = await hwdev.generate_key_image(ephemeral_pub, ephemeral_sec)
    return {
        ephemeral_pub,
        key_image
    }
}

exports.derive_key_image_from_tx = derive_key_image_from_tx

function generate_key_image(pub, sec) {
    if (!pub || pub.length !== 64) {
        throw Error('Invalid pub input length')
    }
    if (!sec || sec.length !== 64) {
        throw Error('Invalid sec input length')
    }
    const pub_m = xmr_vendor_1.CNCrypto._malloc(constants_1.KEY_SIZE)
    const sec_m = xmr_vendor_1.CNCrypto._malloc(constants_1.KEY_SIZE)
    xmr_vendor_1.CNCrypto.HEAPU8.set(xmr_str_utils_1.hextobin(pub), pub_m)
    xmr_vendor_1.CNCrypto.HEAPU8.set(xmr_str_utils_1.hextobin(sec), sec_m)
    if (xmr_vendor_1.CNCrypto.ccall('sc_check', 'number', ['number'], [sec_m]) !== 0) {
        throw Error('sc_check(sec) != 0')
    }
    const point_m = xmr_vendor_1.CNCrypto._malloc(constants_1.STRUCT_SIZES.GE_P3)
    const point2_m = xmr_vendor_1.CNCrypto._malloc(constants_1.STRUCT_SIZES.GE_P2)
    const point_b = xmr_str_utils_1.hextobin(hash_ops_1.hash_to_ec(pub))
    xmr_vendor_1.CNCrypto.HEAPU8.set(point_b, point_m)
    const image_m = xmr_vendor_1.CNCrypto._malloc(constants_1.STRUCT_SIZES.KEY_IMAGE)
    xmr_vendor_1.CNCrypto.ccall('ge_scalarmult', 'void', ['number', 'number', 'number'], [point2_m, sec_m, point_m])
    xmr_vendor_1.CNCrypto.ccall('ge_tobytes', 'void', ['number', 'number'], [image_m, point2_m])
    const res = xmr_vendor_1.CNCrypto.HEAPU8.subarray(image_m, image_m + constants_1.STRUCT_SIZES.KEY_IMAGE)
    xmr_vendor_1.CNCrypto._free(pub_m)
    xmr_vendor_1.CNCrypto._free(sec_m)
    xmr_vendor_1.CNCrypto._free(point_m)
    xmr_vendor_1.CNCrypto._free(point2_m)
    xmr_vendor_1.CNCrypto._free(image_m)
    return xmr_str_utils_1.bintohex(res)
}

exports.generate_key_image = generate_key_image
//# sourceMappingURL=key_image.js.map
