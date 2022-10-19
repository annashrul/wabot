<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\mediaMessageController;

class media extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'media:delete';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete media';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $mediaMessage = new mediaMessageController;
        $deleteMedia = $mediaMessage->deleteDir();

        $this->info($deleteMedia);
    }
}
