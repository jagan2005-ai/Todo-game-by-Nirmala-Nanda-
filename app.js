  class DailyRoutineGame {
            constructor() {
                this.routines = this.loadRoutines();
                this.routineForm = document.getElementById('routineForm');
                this.routineInput = document.getElementById('routineInput');
                this.routinesList = document.getElementById('routinesList');
                this.emptyState = document.getElementById('emptyState');
                this.routineCount = document.getElementById('routineCount');
                
                this.init();
            }
            
            init() {
                this.routineForm.addEventListener('submit', (e) => this.handleSubmit(e));
                this.renderRoutines();
                this.updateCount();
            }
            
            handleSubmit(e) {
                e.preventDefault();
                const routineText = this.routineInput.value.trim();
                
                if (routineText) {
                    this.addRoutine(routineText);
                    this.routineInput.value = '';
                    this.routineInput.focus();
                }
            }
            
            addRoutine(text) {
                const routine = {
                    id: Date.now(),
                    text: text,
                    completed: false,
                    createdAt: new Date().toLocaleString()
                };
                
                this.routines.unshift(routine);
                this.saveRoutines();
                this.renderRoutines();
                this.updateCount();
            }
            
            deleteRoutine(id) {
                const routineElement = document.querySelector(`[data-id="${id}"]`);
                if (routineElement) {
                    routineElement.classList.add('slide-out');
                    setTimeout(() => {
                        this.routines = this.routines.filter(routine => routine.id !== id);
                        this.saveRoutines();
                        this.renderRoutines();
                        this.updateCount();
                    }, 300);
                }
            }
            
            toggleComplete(id) {
                const routine = this.routines.find(r => r.id === id);
                if (routine) {
                    routine.completed = !routine.completed;
                    this.saveRoutines();
                    this.renderRoutines();
                }
            }
            
            renderRoutines() {
                if (this.routines.length === 0) {
                    this.routinesList.classList.add('hidden');
                    this.emptyState.classList.remove('hidden');
                    return;
                }
                
                this.emptyState.classList.add('hidden');
                this.routinesList.classList.remove('hidden');
                
                this.routinesList.innerHTML = this.routines.map(routine => `
                    <li data-id="${routine.id}" class="bg-white/30 rounded-xl p-4 flex items-center gap-4 fade-in hover:bg-white/40 transition-all duration-300">
                        <button 
                            onclick="routineGame.toggleComplete(${routine.id})"
                            class="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center hover:scale-110 transition-transform duration-200 ${routine.completed ? 'bg-green-500 border-green-500' : 'hover:border-green-400'}"
                        >
                            ${routine.completed ? '✓' : ''}
                        </button>
                        
                        <div class="flex-1">
                            <p class="text-white font-medium ${routine.completed ? 'line-through opacity-70' : ''}">
                                ${routine.text}
                            </p>
                            <p class="text-white/60 text-sm">
                                Added: ${routine.createdAt}
                            </p>
                        </div>
                        
                        <button 
                            onclick="routineGame.deleteRoutine(${routine.id})"
                            class="w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-200"
                            title="Delete routine"
                        >
                            🗑
                        </button>
                    </li>
                `).join('');
            }
            
            updateCount() {
                const completedCount = this.routines.filter(r => r.completed).length;
                this.routineCount.textContent = `${completedCount}/${this.routines.length}`;
            }
            
            saveRoutines() {
                localStorage.setItem('dailyRoutines', JSON.stringify(this.routines));
            }
            
            loadRoutines() {
                const saved = localStorage.getItem('dailyRoutines');
                return saved ? JSON.parse(saved) : [];
            }
        }
        
        // Initialize the game
        const routineGame = new DailyRoutineGame();
   
(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'98ef9ef321501c61',t:'MTc2MDUzNDUwMS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();