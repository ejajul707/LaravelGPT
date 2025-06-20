<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;


class ChatController extends Controller
{

    public function chat(Request $request)
    {
        $message = $request->input('message');

        $headers = [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache',
            'Connection' => 'keep-alive',
            'X-Accel-Buffering' => 'no'
        ];

        return response()->stream(function () use ($message) {
            try {
                $response = Http::withOptions([
                    'stream' => true
                ])->post('http://localhost:11434/api/generate', [
                    'model' => 'llama3',
                    'prompt' => $message,
                    'stream' => true
                ]);

                if (!$response->successful()) {
                    throw new \Exception("Ollama API request failed with status: " . $response->status());
                }

                $body = $response->getBody();
                $buffer = '';

                while (!$body->eof()) {
                    $chunk = $body->read(1024);
                    $buffer .= $chunk;

                    while (($pos = strpos($buffer, "\n")) !== false) {
                        $line = trim(substr($buffer, 0, $pos));
                        $buffer = substr($buffer, $pos + 1);

                        if (empty($line)) continue;

                        $data = json_decode($line, true);
                        if (json_last_error() !== JSON_ERROR_NONE) {
                            Log::warning('Invalid JSON from Ollama: ' . $line);
                            continue;
                        }

                        $responseData = [
                            'reply' => $data['response'] ?? '',
                            'done' => $data['done'] ?? false
                        ];

                        echo "data: " . json_encode($responseData) . "\n\n";
                        ob_flush();
                        flush();

                        if (connection_aborted()) {
                            Log::info('Client disconnected');
                            return;
                        }
                    }
                }
            } catch (\Exception $e) {
                Log::error('Streaming error: ' . $e->getMessage());
                echo "data: " . json_encode([
                    'error' => $e->getMessage(),
                    'done' => true
                ]) . "\n\n";
                ob_flush();
                flush();
            }
        }, 200, $headers);
    }
}
