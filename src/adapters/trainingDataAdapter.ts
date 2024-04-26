import {openai} from "../utils/openai";
import fs from 'fs';
import path from 'path';

export const uploadTrainingData = async () => {
    console.log('uploading data')
    const pathToTestFile = path.join(__dirname, './Filtered_10K.jsonl');
    let uploadedFile = await openai.files.create({ file: fs.createReadStream(pathToTestFile), purpose: 'fine-tune' });
    return uploadedFile.id
}

export const fineTuneTrainingData = async (id: string) => {
    return new Promise(resolve => {
        console.log('starting fine tuning')
        openai.fineTuning.jobs.create({ training_file: id, model: 'gpt-3.5-turbo' }).then((fineTune) => resolve(fineTune.id))
    })

}