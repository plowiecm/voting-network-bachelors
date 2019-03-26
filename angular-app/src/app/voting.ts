import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace voting{
   export class voter extends Participant {
      voterID: string;
      firstName: string;
      lastName: string;
   }
   export class canVote extends Asset {
      voterID: string;
      hasVoted: boolean;
   }
   export class candidate extends Asset {
      politician: string;
      totalVote: number;
   }
   export class vote extends Transaction {
      candidateAsset: candidate;
      canVoteAsset: canVote;
   }
// }
